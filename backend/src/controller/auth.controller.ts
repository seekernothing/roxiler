import type { Request, Response } from "express";
import authService from "../services/auth.service";
import { signupSchema } from "../validations/schemas";
import { appError } from "../types";

const authController = {
  async register(req: Request, res: Response) {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new appError(parsed.error.issues[0]?.message ?? "Invalid inputs", 400);
    }
    await authService.register(parsed.data);
    res.status(201).json({ message: "User created successfully" });
  },
};

export default authController;