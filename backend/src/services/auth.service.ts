import bcrypt from "bcrypt";
import prisma from "../prismaClient";
import { appError } from "../types";
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
};

export default authService;