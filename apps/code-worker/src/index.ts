import express from "express";
import cors from "cors";
import env from "dotenv";
import generateRoute from "./routes/generate.route";

env.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/generate", generateRoute);

app.listen(PORT, () => {
  console.log("code worker server is running on port" + PORT);
});
