import { DATABASE_URL } from "$app/env/private";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// A direct PostgreSQL URL is required. Prisma Accelerate (`prisma://`) URLs
// cannot be used by PostgreSQL drivers.
const client = postgres(DATABASE_URL, { max: 1, prepare: false });

export const db = drizzle({ client });
