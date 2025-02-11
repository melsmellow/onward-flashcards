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

export async function generateFlashcardsFromExtractedText(
  extractedText: string,
  numQuestions: number
) {
  try {
    if (!API_KEY) {
      throw new Error("API key is missing");
    }
    if (!extractedText || !numQuestions) {
      throw new Error("extractedText and number of questions are required");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are a highly intelligent AI designed to process text extracted from OCR. The text may be disorganized or fragmented due to how it was captured. Your task is to:

    1. **Reconstruct and Organize** the extracted text into a coherent and logical format. If sentences seem out of order, intelligently infer their correct arrangement while preserving meaning.
    2. **Summarize Key Concepts** to extract the most important ideas, definitions, and details.
    3. **Generate ${numQuestions} Well-Structured Flashcards** based on the organized text. Each flashcard should include:
      - A **clear question** focusing on key concepts, definitions, or important details.
      - A **concise and informative answer** that directly addresses the question.

    Make sure that the flashcards cover a diverse range of topics found in the text.

    ### Extracted OCR Text:
    """
    ${extractedText}
    """

    Now, process the text as described and generate ${numQuestions} high-quality flashcards.

    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return response.split("\n"); // Return as an array of flashcards
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return ["Error generating flashcards. Please try again."];
  }
}
