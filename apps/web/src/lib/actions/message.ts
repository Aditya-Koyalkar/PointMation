"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../../../../../packages/db/client";
import { initializeCodeCreateandRunning } from "./worker";
import { getGeminiResponse } from "../llms/gemini";
import { revalidatePath } from "next/cache";

export const createMessage = async (prompt: string, chatId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      redirect("/auth/signin");
    }
    const userMessage = await prisma.message.create({
      data: {
        role: "user",
        chatId,
        prompt,
      },
    });
    const aiMessage = await prisma.message.create({
      data: {
        role: "ai",
        chatId,
        codeLoading: true,
        videoLoading: true,
      },
    });
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
        id: aiMessage.id,
        chatId,
      },
      data: {
        codeLoading: false,
        codeOutput: code,
      },
    });

    initializeCodeCreateandRunning(chatId, aiMessage.id);
  } catch (error) {
    console.error("Failed to create a message", error);
    return null;
  }
};

export const getAllMessages = async (chatId: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      redirect("/auth/signin");
    }
    const messages = await prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error) {
    console.error("Failed to create a chat", error);
    return null;
  }
};

export const revalidateMessages = async (chatId: string) => {
  revalidatePath(`/chat/${chatId}`);
};
