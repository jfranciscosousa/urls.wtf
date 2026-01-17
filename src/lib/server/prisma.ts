import { DATABASE_ADAPTER, DATABASE_URL } from "$env/static/private";
import { PrismaClient } from "$lib/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaPg } from "@prisma/adapter-pg";

let prisma: PrismaClient;

if (DATABASE_ADAPTER === "pg") {
  const adapter = new PrismaPg({ connectionString: DATABASE_URL });
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient({
    accelerateUrl: DATABASE_URL,
  }).$extends(withAccelerate()) as unknown as PrismaClient;
}

export default prisma;
