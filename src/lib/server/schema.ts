import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * This matches Prisma's existing quoted table and column names exactly.
 * Do not rename these identifiers without an additive database migration.
 */
export const hashedUrls = pgTable("HashedUrl", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  hash: text().notNull().unique(),
  url: text().notNull(),
  createdAt: timestamp({ precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp({ precision: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
});
