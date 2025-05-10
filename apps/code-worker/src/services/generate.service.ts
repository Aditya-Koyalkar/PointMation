import { dir as tmpDir } from "tmp-promise";
import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import prisma from "../../../../packages/db/client";
import io from "..";

const execPromise = promisify(exec);

export const generateVideoService = async (code: string, scene: string, res: Response, chatId: string, messageId: string, userId: string) => {
  try {
    const aiMessage = await prisma.message.findUnique({
      where: {
        id: messageId,
        chatId,
      },
    });
    io.on("connection", (socket) => {
      console.log("User connected: " + socket.id);

      socket.on("join-room", (userId) => {
        socket.join(userId);
        console.log(`User ${socket.id} joined room ${userId}`);
      });
    });

    if (!aiMessage) {
      throw Error("Message not found");
    }

    // Step 1: Create temp directory for this job
    const { path: tempDirPath, cleanup } = await tmpDir({ unsafeCleanup: true });
    // Step 2: Write code to a Python file
    const filePath = path.join(tempDirPath, "main.py");
    await fs.writeFile(filePath, code);

    // 3. Render with Manim CLI
    const cmd = `manim ${filePath} ${scene} -o output.mp4 -ql`;
    console.log(`Running: ${cmd}`);
    await execPromise(cmd, { cwd: tempDirPath });

    // Find output
    const outputPath = path.join(tempDirPath, "output.mp4");
    const fallbackPath = path.join(tempDirPath, "media/videos/main/480p15/output.mp4");
    const finalOutputPath = fs.existsSync(outputPath) ? outputPath : fallbackPath;
    if (!fs.existsSync(finalOutputPath)) {
      console.error("Rendered file not found");
      throw new Error("Rendered file not found");
    }

    const cloundinaryResponse = await cloudinary.uploader.upload(finalOutputPath, {
      resource_type: "video",
    });

    const video_url = cloundinaryResponse.secure_url;

    await prisma.message.update({
      where: {
        id: messageId,
        chatId,
      },
      data: {
        videoUrl: video_url,
        videoLoading: false,
      },
    });

    io.to(userId).emit("code-worker", "video created");
    setTimeout(cleanup, 10_000); // Delay to avoid deleting before stream ends
    res
      .json({
        message: "generated the video sucessfully",
      })
      .status(200);
  } catch (error) {
    await prisma.message.update({
      where: {
        id: messageId,
        chatId,
      },
      data: {
        error: true,
      },
    });
    io.to(userId).emit("code-worker", "video creation failed");
    throw error;
  }
};
