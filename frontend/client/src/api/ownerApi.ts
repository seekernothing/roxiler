import api from "./client";
import type { OwnerDashboardData } from "../types";

export const getOwnerDashboard = () =>
  api.get<OwnerDashboardData>("/stores/owner/dashboard");