"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../../../packages/db/client";
import { getGeminiResponse } from "../llms/gemini";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import jwt from "jsonwebtoken";

export const initializeCodeCreateandRunning = async (chatId: string, userMessageId: string, aiMessageId: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw Error("Unauthorized access");
    }
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
    const filteredMessages = allMessages.filter((message) => (message.role == "ai" ? message.codeOutput : message.prompt));
    const code = await getGeminiResponse(filteredMessages, userMessage.prompt || "");
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
    const token = jwt.sign(
      {
        id: session.user.id,
        email: session.user.email,
      },
      process.env.NEXT_PUBLIC_JWT_SECRET || "mysupersecret",
      {
        expiresIn: "1h",
      }
    );
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORKER_SERVER_URL}/api/v1/generate/video`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ code, id: aiMessageId, chatId }),
    } as RequestInit);
    if (!response.ok) {
      throw Error("Error generating video");
    }
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
