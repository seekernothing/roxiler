import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import { appError } from "../types";
import type { Prisma, Role } from "@prisma/client";

const ALLOWED_SORT = ["name", "email", "address", "role"];

const adminService = {
  async getDashboardStats() {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.rating.count(),
    ]);
    return { totalUsers, totalStores, totalRatings };
  },

  async addUser(data: {
    name: string; email: string; password: string; address: string; role: Role;
  }) {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new appError("User already exists", 400);
    const hashed = await bcrypt.hash(data.password, 10);
    await prisma.user.create({ data: { ...data, password: hashed } });
  },

  async addStore(data: { name: string; email: string; address: string; ownerId: number }) {
    const owner = await prisma.user.findUnique({ where: { id: data.ownerId } });
    if (!owner) throw new appError("Owner user not found", 404);

    const storeExists = await prisma.store.findUnique({ where: { email: data.email } });
    if (storeExists) throw new appError("Store email already exists", 400);

    const store = await prisma.store.create({ data });
    await prisma.user.update({ where: { id: data.ownerId }, data: { role: "OWNER" } });
    return store;
  },

  async listUsers(query: Record<string, string | undefined>) {
    const { name, email, address, role } = query;
    const sortBy = ALLOWED_SORT.includes(query.sortBy ?? "") ? query.sortBy! : "name";
    const order = query.order === "desc" ? "desc" : "asc";

    const where: Prisma.UserWhereInput = {
      ...(name && { name: { contains: name, mode: "insensitive" } }),
      ...(email && { email: { contains: email, mode: "insensitive" } }),
      ...(address && { address: { contains: address, mode: "insensitive" } }),
      ...(role && { role: role as Role }),
    };

    return prisma.user.findMany({
      where,
      orderBy: { [sortBy]: order },
      select: { id: true, name: true, email: true, address: true, role: true },
    });
  },

  async listStores(query: Record<string, string | undefined>) {
    const { name, email, address } = query;
    const sortBy = ["name", "email", "address"].includes(query.sortBy ?? "") ? query.sortBy! : "name";
    const order = query.order === "desc" ? "desc" : "asc";

    const stores = await prisma.store.findMany({
      where: {
        ...(name && { name: { contains: name, mode: "insensitive" } }),
        ...(email && { email: { contains: email, mode: "insensitive" } }),
        ...(address && { address: { contains: address, mode: "insensitive" } }),
      },
      orderBy: { [sortBy]: order },
      include: { ratings: { select: { value: true } } },
    });

    return stores.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      address: s.address,
      rating: s.ratings.length
        ? Number((s.ratings.reduce((sum, r) => sum + r.value, 0) / s.ratings.length).toFixed(1))
        : null,
    }));
  },

  async getUserDetails(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true, name: true, email: true, address: true, role: true,
        store: { include: { ratings: { select: { value: true } } } },
      },
    });
    if (!user) throw new appError("User not found", 404);

    let rating: number | null = null;
    if (user.role === "OWNER" && user.store && user.store.ratings.length) {
      rating = Number(
        (user.store.ratings.reduce((sum, r) => sum + r.value, 0) / user.store.ratings.length).toFixed(1),
      );
    }

    return { id: user.id, name: user.name, email: user.email, address: user.address, role: user.role, rating };
  },
};

export default adminService;