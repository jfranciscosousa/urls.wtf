# urls.wtf

This is a minimal, privacy-focused URL shortener with no fluff. It uses Svelte, SvelteKit, Tailwind CSS, and Drizzle, and deploys to Vercel.

## Toolchain

Use `mise` as the definitive toolchain manager for this repository. Install the
versions in `.tool-versions` with `mise install`, then run commands through
`mise exec -- <command>` (for example, `mise exec -- pnpm test`). Do not use a
globally installed Node.js, pnpm, or PostgreSQL binary when the `mise` version
is available.

## Local databases

PostgreSQL is pinned in `.tool-versions`. Before running the app or tests,
provision and start it through `mise`, then create two local databases:

- Copy `.env.example` to `.env` and use its `urls_wtf` `DATABASE_URL` for development.
- Copy `.env.test.example` to `.env.test` and use its distinct `urls_wtf_test`
  `DATABASE_URL` for tests.

Never point `.env.test` at a development or production database. `pnpm test`
loads `.env.test` explicitly and applies migrations only to that test database.

## Dependency audits

Current audit findings are acceptable because the affected code is unused in production. If audit findings change, update this note.
