import api from "./client";
import type { StoreForUser } from "../types";

export const getStores = (params: {
  name?: string;
  address?: string;
  sortBy?: string;
  order?: string;
}) => api.get<{ stores: StoreForUser[] }>("/stores", { params });

export const setRating = (storeId: number, value: number) =>
  api.post(`/rating/${storeId}`, { value });