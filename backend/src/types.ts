import type { Request } from "express";
import type { Role } from "@prisma/client";


export class appError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export interface UserRequest extends Request {
  userId?: number;
  userRole?: Role;
}