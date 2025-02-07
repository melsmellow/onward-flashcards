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
    You are a helpful assistant that generates flashcards from text. 

    Given the following extracted text, create ${numQuestions} well-structured flashcards. Each flashcard should have:
    - A clear question based on important concepts or details from the text.
    - A concise and informative answer.

    Make sure the questions cover key ideas, definitions, and important takeaways.

    Extracted Text:
    """
    ${extractedText}
    """

    Now, generate ${numQuestions} flashcards.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return response.split("\n"); // Return as an array of flashcards
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return ["Error generating flashcards. Please try again."];
  }
}
