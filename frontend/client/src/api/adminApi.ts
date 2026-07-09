import api from "./client";
import type { User, AdminStore, AdminStats, Role } from "../types";

export const getStats = () => api.get<AdminStats>("/admin/dashboard");

export const getUsers = (params: {
  name?: string;
  email?: string;
  address?: string;
  role?: string;
  sortBy?: string;
  order?: string;
}) => api.get<{ users: User[] }>("/admin/users", { params });

export const getAdminStores = (params: {
  name?: string;
  email?: string;
  address?: string;
  sortBy?: string;
  order?: string;
}) => api.get<{ stores: AdminStore[] }>("/admin/stores", { params });

export const createUser = (data: {
  name: string;
  email: string;
  address: string;
  password: string;
  role: Role;
}) => api.post("/admin/users", data);

export const createStore = (data: {
  name: string;
  email: string;
  address: string;
  ownerId: number;
}) => api.post("/admin/stores", data);