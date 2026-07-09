import bcrypt from "bcrypt";
import prisma from "../prismaClient";
import { appError } from "../types";
import jwt from "jsonwebtoken";
import config from "../config";
import type { SignupInput } from "../validations/schemas";

const authService = {
  async register(data: SignupInput) {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new appError("User already exists", 400);

    const hashed = await bcrypt.hash(data.password, 10);
    await prisma.user.create({
      data: { ...data, password: hashed },
    });
  },

  
  async login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new appError("Invalid email or password", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new appError("Invalid email or password", 401);

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    config.jwtSecret,
    { expiresIn: "2d" },
  );
  return { token, role: user.role };
},
};

export default authService;