import type { Response, NextFunction } from "express";
import type { UserRequest } from "../types";

export default function checkRole(...roles: string[]) {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}