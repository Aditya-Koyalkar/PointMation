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
