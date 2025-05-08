"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../../../packages/db/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function getUserChats() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      redirect("/auth/sigin");
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
      redirect("/auth/sigin");
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
