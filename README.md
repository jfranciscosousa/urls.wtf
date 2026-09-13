# urls.wtf

A minimalistic URL shortener.

- [SvelteKit](https://kit.svelte.dev)
- [Drizzle ORM](https://orm.drizzle.team)
- [Vercel Edge](https://vercel.com/docs/concepts/edge-network/overview)

## Database

The app connects directly to PostgreSQL using `DATABASE_URL`; Prisma Accelerate
(`prisma://`) URLs are not compatible with Drizzle's PostgreSQL driver.

`build-prod` applies pending migrations before building:

```sh
DATABASE_URL=postgres://postgres:postgres@localhost:5432/urls_wtf pnpm build-prod
```

The first Drizzle migration is a baseline for the pre-existing Prisma table,
`"HashedUrl"`. It creates that table only when it is absent. On an existing
production database it leaves the URL data and table definition untouched, then
records the baseline in Drizzle's migration table. Future production migrations
must be backward-compatible and additive.
