import { DATABASE_URL } from "$env/static/private";
import { PrismaClient } from "@prisma-generated/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient({ datasourceUrl: DATABASE_URL }).$extends(withAccelerate());

export default prisma;
