import { dir as tmpDir } from "tmp-promise";
import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { Response } from "express";

const execPromise = promisify(exec);

export const generateVideoService = async (code: string, scene: string, res: Response) => {
  try {
    // Step 1: Create temp directory for this job
    const { path: tempDirPath, cleanup } = await tmpDir({ unsafeCleanup: true });
    const dockerMountPath = toDockerPath(tempDirPath);
    // Step 2: Write code to a Python file
    const filePath = path.join(tempDirPath, "main.py");
    await fs.writeFile(filePath, code);
    // Step 3: Run Docker to render the animation
    const dockerCmd = [
      "docker run --rm",
      `-v "${dockerMountPath}:/manim"`,
      "-w /manim",
      "manimcommunity/manim:stable",
      `manim main.py ${scene} -o output.mp4 -ql`, // <- no `-p`
    ].join(" ");
    console.log(`Executing Docker command:\n${dockerCmd}`);
    await execPromise(dockerCmd);
    // Step 4: Locate the rendered video file
    const outputPath = path.join(tempDirPath, "output.mp4");
    const fallbackPath = path.join(tempDirPath, "media/videos/main/480p15/output.mp4");
    const finalOutputPath = fs.existsSync(outputPath) ? outputPath : fallbackPath;
    if (!fs.existsSync(finalOutputPath)) {
      console.error("Rendered file not found");
      throw new Error("Rendered file not found");
    }
    // Step 5: Create a stream from the file
    const videoStream = fs.createReadStream(finalOutputPath);
    // Step 6: Return the video stream as a response
    res.set({
      "Content-Type": "video/mp4",
      "Content-Disposition": "inline; filename=output.mp4",
    });
    videoStream.pipe(res);
    setTimeout(cleanup, 10_000); // Delay to avoid deleting before stream ends
  } catch (error) {
    throw error;
  }
};

function toDockerPath(windowsPath: string) {
  return windowsPath
    .replace(/\\/g, "/") // backslashes to forward slashes
    .replace(/^([A-Za-z]):/, (_, drive) => `/${drive.toLowerCase()}`); // C:\ => /c/
}
