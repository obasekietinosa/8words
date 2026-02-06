import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || '');

export interface GeneratedWordSet {
  title: string;
  type: string;
  words: string[];
}

export const generateWordSet = async (prompt: string): Promise<GeneratedWordSet> => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const fullPrompt = `${prompt}

  Please return the result in the following JSON format:
  {
    "title": "Title of the word set",
    "type": "Type/Category of the word set",
    "words": ["word1", "word2", "word3", ...]
  }
  Ensure the response is valid JSON and nothing else. Do not include markdown formatting like \`\`\`json.`;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  const text = response.text();

  try {
    // Attempt to clean up markdown if present despite instructions
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanedText) as GeneratedWordSet;

    if (!data.title || !data.type || !Array.isArray(data.words)) {
        throw new Error("Invalid response structure");
    }

    return data;
  } catch (error) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("Failed to parse Gemini response");
  }
};
