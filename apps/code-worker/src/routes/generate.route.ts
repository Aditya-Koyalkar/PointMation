import express from "express";
import { generateVideoController } from "../controllers/generate.controller";
const router = express.Router();

router.post("/video", generateVideoController);

export default router;
