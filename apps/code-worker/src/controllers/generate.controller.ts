import { NextFunction, Request, Response } from "express";
import { generateVideoService } from "../services/generate.service";
import { AuthRequest } from "../middlewares/authMiddleware";

export const generateVideoController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const { code, scene = "RightTriangleScene", chatId, id } = body;

    if (!code || !chatId || !id) {
      console.log("Required data is not their");
      res.status(400).json({ error: "Required data is not their" }).status(400);
      return;
    }
    await generateVideoService(code, scene, res, chatId, id, req.user?.id || "");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
