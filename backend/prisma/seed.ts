import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("Password@123", 10);

  await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      name: "System Administrator Account",
      email: "admin@test.com",
      password: hashedPassword,
      address: "balewadi high street, pune",
      role: Role.ADMIN,
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: "owner@test.com" },
    update: {},
    create: {
      name: "Store Owner Test Account One",
      email: "owner@test.com",
      password: hashedPassword,
      address: "fc road shivajinagar, pune",
      role: Role.OWNER,
    },
  });

  await prisma.store.upsert({
    where: { email: "store@test.com" },
    update: {},
    create: {
      name: "Test Store One For Rating App",
      email: "store@test.com",
      address: "kalyani nagar, Pune",
      ownerId: owner.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      name: "Normal User Testing Account",
      email: "user@test.com",
      password: hashedPassword,
      address: "koregaon park, Pune",
      role: Role.USER,
    },
  });

  console.log("Seeded ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());