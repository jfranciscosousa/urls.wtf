import { DATABASE_URL } from "$env/static/private";
import { PrismaClient } from "$lib/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient({
  accelerateUrl: DATABASE_URL,
}).$extends(withAccelerate());

export default prisma;
