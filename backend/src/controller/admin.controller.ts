import type { Request, Response } from "express";
import adminService from "../services/admin.service";
import { addUserSchema, addStoreSchema } from "../validations/schemas";
import { appError } from "../types";

const adminController = {
  async dashboard(req: Request, res: Response) {
    res.json(await adminService.getDashboardStats());
  },

  async addUser(req: Request, res: Response) {
    const parsed = addUserSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new appError(parsed.error.issues[0]?.message ?? "Invalid inputs", 400);
    }
    await adminService.addUser(parsed.data);
    res.status(201).json({ message: "User created" });
  },

  async addStore(req: Request, res: Response) {
    const parsed = addStoreSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new appError(parsed.error.issues[0]?.message ?? "Invalid inputs", 400);
    }
    const store = await adminService.addStore(parsed.data);
    res.status(201).json({ message: "Store created", store });
  },

  async listUsers(req: Request, res: Response) {
    res.json({ users: await adminService.listUsers(req.query as Record<string, string>) });
  },

  async listStores(req: Request, res: Response) {
    res.json({ stores: await adminService.listStores(req.query as Record<string, string>) });
  },

  async userDetails(req: Request, res: Response) {
    res.json({ user: await adminService.getUserDetails(Number(req.params.id)) });
  },
};

export default adminController;