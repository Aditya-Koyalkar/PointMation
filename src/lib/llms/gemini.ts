import { GoogleGenAI } from "@google/genai";
import { ChatMessageType } from "@/types/chat";
import { manimPrompt } from "../prompts/prompt1";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function getGeminiResponse(conversationHistory: ChatMessageType[], prompt: string): Promise<string | null | undefined> {
  try {
    const history = conversationHistory.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));
    const conversation = [
      {
        role: "model",
        parts: [{ text: "Please use the following system prompt for our conversation: " + manimPrompt }],
      },
      ...history,
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: conversation,
    });
    const code = response?.text;
    const cleanedCode = code!
      .replace(/^```[\s\S]*?\n/, "") // remove opening triple backticks and language tag
      .replace(/```$/, ""); // remove closing triple backticks
    return cleanedCode;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
}
