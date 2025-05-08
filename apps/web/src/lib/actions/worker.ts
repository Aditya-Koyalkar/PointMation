"use server";

import { getServerSession } from "next-auth";
import prisma from "../../../../../packages/db/client";
import jwt from "jsonwebtoken";
import { authOptions } from "../authOptions";

export const initializeCodeCreateandRunning = async (chatId: string, aiMessageId: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw Error("Unauthorized access");
    }
    const aiMessage = await prisma.message.findUnique({ where: { id: aiMessageId, chatId } });
    if (!aiMessage || !aiMessage.codeOutput) {
      throw Error("error while creating video");
    }
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
      body: JSON.stringify({ code: aiMessage.codeOutput, id: aiMessageId, chatId }),
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
