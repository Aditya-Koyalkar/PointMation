import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    email: string;
    id: string;
  };
}

export const authMiddleWare = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    console.log(token);
    // Verify the token
    // IMPORTANT: Use the same secret key as in your Next.js app
    const decoded = jwt.verify(token || "", process.env.JWT_SECRET || "mysupersecret") as JwtPayload;

    if (!decoded || !decoded.id) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }

    req.user = decoded as any;

    // Move to the next middleware or route handler
    next();
  } catch (error: any) {
    console.error("JWT Authentication Error:", error);

    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Unauthorized: Token expired" });
      return;
    }

    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
      return;
    }

    res.status(500).json({ error: "Internal server error during authentication" });
    return;
  }
};
