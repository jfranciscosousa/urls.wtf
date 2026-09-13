-- Baseline for Prisma's existing table. Keep this conditional: production
-- already has the table and must not be rebuilt during the ORM cutover.
DO $$
BEGIN
        IF to_regclass('public."HashedUrl"') IS NULL THEN
                CREATE TABLE "HashedUrl" (
                        "id" text PRIMARY KEY,
                        "hash" text NOT NULL UNIQUE,
                        "url" text NOT NULL UNIQUE,
                        "createdAt" timestamp(3) DEFAULT now() NOT NULL,
                        "updatedAt" timestamp(3) NOT NULL
                );
        END IF;
END
$$;
