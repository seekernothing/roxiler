
import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be 8-16 characters")
  .max(16, "Password must be 8-16 characters")
  .regex(/[A-Z]/, "Must include at least one uppercase letter")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must include at least one special character");

export const signupSchema = z.object({
  name: z.string().trim().min(20, "Name must be 20-60 characters").max(60),
  email: z.string().trim().toLowerCase().email(),
  address: z.string().max(400),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: passwordSchema,
});

export const addUserSchema = signupSchema.extend({
  role: z.enum(["ADMIN", "USER", "OWNER"]).default("USER"),
});

export const addStoreSchema = z.object({
  name: z.string().trim().min(1).max(60),
  email: z.string().trim().toLowerCase().email(),
  address: z.string().max(400),
  ownerId: z.number().int(),
});

export const ratingSchema = z.object({
  value: z.number().int().min(1, "Rating must be 1-5").max(5, "Rating must be 1-5"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
export type AddUserInput = z.infer<typeof addUserSchema>
export type AddStoreInput = z.infer<typeof addStoreSchema>
export type RatingInput = z.infer<typeof ratingSchema>