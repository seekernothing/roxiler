import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be 8-16 characters")
  .max(16, "Password must be 8-16 characters")
  .regex(/[A-Z]/, "Must include at least one uppercase letter")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must include at least one special character");

export const signupSchema = z.object({
  name: z.string().trim().min(20, "Name must be 20-60 characters").max(60, "Name must be 20-60 characters"),
  email: z.string().trim().email("Invalid email"),
  address: z.string().min(1, "Address is required").max(400, "Address must be under 400 characters"),
  password: passwordSchema,
});