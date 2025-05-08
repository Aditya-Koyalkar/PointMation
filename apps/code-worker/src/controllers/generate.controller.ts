import { NextFunction, Request, Response } from "express";
import { generateVideoService } from "../services/generate.service";
import { AuthRequest } from "../middlewares/authMiddleware";

export const generateVideoController = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const { code, scene = "RightTriangleScene" } = body;
    if (!code) {
      res.status(400).json({ error: "Manim code is required." }).status(400);
      return;
    }
    generateVideoService(code, scene, res);
  } catch (error) {
    next(error);
  }
};
