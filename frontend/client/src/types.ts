export type Role = "ADMIN" | "USER" | "OWNER";

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  role: Role;
}

export interface StoreForUser {
  id: number;
  name: string;
  address: string;
  overallRating: number | null;
  myRating: number | null;
}

export interface AdminStore {
  id: number;
  name: string;
  email: string;
  address: string;
  rating: number | null;
}

export interface AdminStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

export interface OwnerDashboardData {
  storeName: string;
  averageRating: number | null;
  raters: { userName: string; email: string; rating: number }[];
}