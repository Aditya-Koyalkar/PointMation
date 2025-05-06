import { NextFunction, Request, Response } from "express";
import { generateVideoService } from "../services/generate.service";

export const generateVideoController = (req: Request, res: Response, next: NextFunction) => {
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
