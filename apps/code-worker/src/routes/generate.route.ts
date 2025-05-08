import express from "express";
import { generateVideoController } from "../controllers/generate.controller";
import { authMiddleWare } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/video", authMiddleWare, generateVideoController);

export default router;
