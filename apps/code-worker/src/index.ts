import express from "express";
import cors from "cors";
import env from "dotenv";
import generateRoute from "./routes/generate.route";
import { v2 as cloudinary } from "cloudinary";

env.config();

const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/v1/generate", generateRoute);

app.listen(PORT, () => {
  console.log("code worker server is running on port " + PORT);
});
