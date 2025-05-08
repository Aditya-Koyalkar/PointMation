"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../../../packages/db/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authOptions } from "../authOptions";

export async function getUserChats() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      redirect("/auth/signin");
    }
    const chats = await prisma.chat.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return chats;
  } catch (error) {
    console.error("Failed to fetch user chats:", error);
    return [];
  }
}

export const createChat = async (name: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      redirect("/auth/signin");
    }
    const chat = prisma.chat.create({
      data: {
        name,
        userId: session.user.id,
      },
    });
    return chat;
  } catch (error) {
    console.error("Failed to create a chat", error);
    return null;
  }
};

export const deleteChat = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      redirect("/auth/signin");
    }
    await prisma.chat.delete({
      where: {
        id,
      },
    });
    revalidatePath("/chat");
  } catch (error) {
    console.error("Failed to deleting a chat", error);
    return null;
  }
};
