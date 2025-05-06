import { GoogleGenAI } from "@google/genai";
import { ChatMessageType } from "@/types/chat";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function getGeminiResponse(conversationHistory: ChatMessageType[], prompt: string): Promise<string | null | undefined> {
  try {
    const contents = conversationHistory.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    contents.push({
      role: "user",
      parts: [{ text: prompt }],
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });
    return response?.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
}
