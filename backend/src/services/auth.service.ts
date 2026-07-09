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

async getMe(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, address: true, role: true },
  });
},

async updatePassword(userId: number, oldPassword: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new appError("User not found", 404);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new appError("Old password is incorrect", 401);

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: userId }, data: { password: hashed } });
},
};

export default authService;