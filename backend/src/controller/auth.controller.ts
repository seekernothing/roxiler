import type { Request, Response } from "express";
import authService from "../services/auth.service";
import { signupSchema ,loginSchema} from "../validations/schemas";
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

  async login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) throw new appError("Invalid inputs", 400);

  const { token, role } = await authService.login(parsed.data.email, parsed.data.password);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,      
      sameSite: "lax",   
      maxAge: 2 * 24 * 60 * 60 * 1000,
    })
    .json({ message: "Login successful", role });
},

async logout(req: Request, res: Response) {
  res.clearCookie("token").json({ message: "Logged out successfully" });
},
};

export default authController;