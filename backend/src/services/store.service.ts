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

  async ownerDashboard(ownerId: number) {
  const store = await prisma.store.findUnique({
    where: { ownerId },
    include: {
      ratings: { include: { user: { select: { name: true, email: true } } } },
    },
  });
  if (!store) return null;

  return {
    storeName: store.name,
    averageRating: store.ratings.length
      ? Number((store.ratings.reduce((sum, r) => sum + r.value, 0) / store.ratings.length).toFixed(1))
      : null,
    raters: store.ratings.map((r) => ({
      userName: r.user.name,
      email: r.user.email,
      rating: r.value,
    })),
  };
},
};

export default storeService;