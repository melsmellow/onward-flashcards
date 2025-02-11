"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_AI_API_KEY; // Store API key in .env.local

export async function generateFlashcards(topic: string, numQuestions: number) {
  try {
    if (!API_KEY) {
      throw new Error("API key is missing");
    }
    if (!topic || !numQuestions) {
      throw new Error("Topic and number of questions are required");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate ${numQuestions} flashcards about ${topic}. Each flashcard should have a question and an answer.`;
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return response.split("\n"); // Return as an array of flashcards
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return ["Error generating flashcards. Please try again."];
  }
}

export async function reconstructExtractedText(extractedText: string) {
  try {
    if (!API_KEY) {
      throw new Error("API key is missing");
    }
    if (!extractedText) {
      throw new Error("Extracted text is required");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are an advanced text reconstruction AI. The following text was extracted from images using OCR, but it may be jumbled or out of order. 

    Your task is to:
    1. **Reconstruct and arrange the text logically**, ensuring that fragmented or disordered sentences are properly structured.
    2. **Remove unnecessary artifacts** like OCR errors or broken words.
    3. **Preserve the original meaning** while improving readability.

    Here is the extracted OCR text:
    """
    ${extractedText}
    """

    Now, provide the **structured and logically ordered version** of this text.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text(); // Return the structured text
  } catch (error) {
    console.error("Error reconstructing text:", error);
    return extractedText; // Fallback to original text if AI call fails
  }
}

export async function generateFlashcardsFromText(structuredText: string, numQuestions: number) {
  try {
    if (!API_KEY) {
      throw new Error("API key is missing");
    }
    if (!structuredText || !numQuestions) {
      throw new Error("Structured text and number of questions are required");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are an expert flashcard creator. Given the structured text below, generate ${numQuestions} high-quality flashcards.

    Each flashcard should have:
    - A **clear question** that tests understanding of key concepts.
    - A **concise and informative answer**.

    Make sure the flashcards cover important definitions, key takeaways, and main ideas.

    ### Structured Text:
    """
    ${structuredText}
    """

    Now, generate ${numQuestions} well-structured flashcards.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text().split("\n"); // Return flashcards as an array
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return ["Error generating flashcards. Please try again."];
  }
}
