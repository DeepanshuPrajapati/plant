import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('Missing Gemini API key. Please check your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt: string) {
  try {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured. Please check your environment variables.');
    }

    // Initialize the model with Gemini 1.5 Pro
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    
    if (error instanceof Error) {
      // Check for quota exceeded error
      if (error.message.includes('429') || error.message.includes('quota')) {
        return "You've reached the API rate limit. Please wait a moment before trying again.";
      }
      if (error.message.includes('API key')) {
        return "Error: The API key is invalid or not properly configured. Please check your environment variables.";
      }
      if (error.message.includes('PERMISSION_DENIED')) {
        return "Error: Access to the Gemini API was denied. Please verify your API key and permissions.";
      }
      return `Error: ${error.message}. Please try again later.`;
    }
    
    return "I apologize, but I'm having trouble processing your request at the moment. Please try again later.";
  }
}