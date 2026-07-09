import api from "./client";
import type { User, Role } from "../types";

export const login = (email: string, password: string) =>
  api.post<{ message: string; role: Role }>("/auth/login", { email, password });

export const register = (data: {
  name: string;
  email: string;
  address: string;
  password: string;
}) => api.post("/auth/register", data);

export const logoutApi = () => api.post("/auth/logout");

export const getMe = () => api.get<{ user: User }>("/auth/me");

export const updatePassword = (oldPassword: string, newPassword: string) =>
  api.patch("/auth/password", { oldPassword, newPassword });