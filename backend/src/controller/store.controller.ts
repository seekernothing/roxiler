import type { Response } from "express";
import type { UserRequest } from "../types";
import storeService from "../services/store.service";

const storeController = {
  async listForUser(req: UserRequest, res: Response) {
    const stores = await storeService.listForUser(
      req.userId!,
      req.query as Record<string, string>,
    );
    res.json({ stores });
  },
};

export default storeController;