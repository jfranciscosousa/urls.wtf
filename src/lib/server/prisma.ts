import { DATABASE_URL } from "$env/static/private";
import { PrismaClient } from "@prisma-generated/client/edge";

const prisma = new PrismaClient({ datasourceUrl: DATABASE_URL });

export default prisma;
