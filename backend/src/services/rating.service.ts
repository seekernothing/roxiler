import prisma from "../prismaClient";
import { appError } from "../types";

const ratingService = {
  async setRating(userId: number, storeId: number, value: number) {
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) throw new appError("Store not found", 404);

    return prisma.rating.upsert({
      where: { userId_storeId: { userId, storeId } },
      update: { value },
      create: { value, userId, storeId },
    });
  },
};

export default ratingService;