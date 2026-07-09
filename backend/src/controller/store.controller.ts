import type { Response } from "express";
import type { UserRequest } from "../types";
import storeService from "../services/store.service";
import { appError } from "../types";

const storeController = {
  async listForUser(req: UserRequest, res: Response) {
    const stores = await storeService.listForUser(
      req.userId!,
      req.query as Record<string, string>,
    );
    res.json({ stores });
  },
  
  async ownerDashboard(req: UserRequest, res: Response) {
  const data = await storeService.ownerDashboard(req.userId!);
  if (!data) throw new appError("No store found for this owner", 404);
  res.json(data);
},
};

export default storeController;