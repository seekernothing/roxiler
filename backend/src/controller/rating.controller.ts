import type { Response } from "express";
import type { UserRequest } from "../types";
import ratingService from "../services/rating.service";
import { ratingSchema } from "../validations/schemas";
import { appError } from "../types";

const ratingController = {
  async setRating(req: UserRequest, res: Response) {
    const parsed = ratingSchema.safeParse(req.body);
    if (!parsed.success) throw new appError("Rating must be between 1 and 5", 400);

    const rating = await ratingService.setRating(
      req.userId!,
      Number(req.params.storeId),
      parsed.data.value,
    );
    res.json({ message: "Rating saved", rating });
  },
};

export default ratingController;