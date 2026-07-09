import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import type { UserRequest } from "../types";
import type { Role } from "@prisma/client";

export default function authMiddleware(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId: number;
      role: Role;
    };
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}