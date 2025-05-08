import prisma from "../../../../../packages/db/client";
import { getGeminiResponse } from "../llms/gemini";

export const initializeCodeCreateandRunning = async (chatId: string, userMessageId: string, aiMessageId: string) => {
  try {
    const [aiMessage, userMessage] = await Promise.all([
      prisma.message.findUnique({ where: { id: aiMessageId, chatId } }),
      prisma.message.findUnique({ where: { id: userMessageId, chatId } }),
    ]);

    if (!aiMessage || !userMessage) {
      throw Error("Message not found");
    }
    const allMessages = await prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    const code = await getGeminiResponse(allMessages, userMessage.prompt || "");
    if (!code) {
      throw Error("Error getting ai response");
    }
    await prisma.message.update({
      where: {
        id: aiMessageId,
        chatId,
      },
      data: {
        codeLoading: false,
        codeOutput: code,
      },
    });
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORKER_SERVER_URL}/api/v1/generate/video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, message_id: aiMessageId, chatId }),
    });
    if (!response.ok) {
      throw Error("Error generating video");
    }

    const data = await response.json();

    await prisma.message.update({
      where: {
        id: aiMessageId,
        chatId,
      },
      data: {
        videoLoading: false,
        videoUrl: data.video_url,
      },
    });

    return {
      message: "Sucessfully generated video",
    };
  } catch (e) {
    console.log("Error :: ", e);
    await prisma.message.update({
      where: {
        id: aiMessageId,
        chatId,
      },
      data: {
        error: true,
      },
    });
  }
};
