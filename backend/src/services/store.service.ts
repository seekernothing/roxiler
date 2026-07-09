import prisma from "../prismaClient";

const storeService = {
  async listForUser(userId: number, query: Record<string, string | undefined>) {
    const { name, address } = query;
    const sortBy = ["name", "address"].includes(query.sortBy ?? "") ? query.sortBy! : "name";
    const order = query.order === "desc" ? "desc" : "asc";

    const stores = await prisma.store.findMany({
      where: {
        ...(name && { name: { contains: name, mode: "insensitive" } }),
        ...(address && { address: { contains: address, mode: "insensitive" } }),
      },
      orderBy: { [sortBy]: order },
      include: { ratings: true },
    });

    return stores.map((s) => {
      const mine = s.ratings.find((r) => r.userId === userId);
      return {
        id: s.id,
        name: s.name,
        address: s.address,
        overallRating: s.ratings.length
          ? Number((s.ratings.reduce((sum, r) => sum + r.value, 0) / s.ratings.length).toFixed(1))
          : null,
        myRating: mine ? mine.value : null,
      };
    });
  },
};

export default storeService;