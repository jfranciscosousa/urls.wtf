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
To test without changing environment files, set `DATABASE_URL` to an isolated
local test database, then run `pnpm run db:migrate` and `pnpm run test:e2e`.
Playwright uses port 4173. Use an isolated network namespace when working alongside other local tests.

## Learning more about Effect

This repository uses the Effect TypeScript library.

Before writing any Effect code, read `node_modules/effect/AGENTS.md` completely.
Follow its links when required. For APIs and concepts not covered by the guide,
search the installed source in `node_modules/effect/src`.

## Runtime and dependency maintenance

- Vercel's function runtime is set in `vite.config.ts` (`runtime: "nodejs26.x"`). Change it together with `engines.node` in `package.json`.
- CI uses `.tool-versions` for Node and pnpm. Keep the `packageManager` field and the CI PostgreSQL service image in sync with `.tool-versions`.
- Keep TypeScript at 6.0.3 until SvelteKit and `svelte-check` support 7. Both declare TypeScript 6 peers, and TypeScript 7.0.2 fails in `svelte-kit sync` (checked 2026-11-18).
- Keep `drizzle-kit` and `drizzle-orm` at 1.0.0-rc.5 until stable 1.x releases are available. This is the latest matched release candidate. Keep the 1.x snapshot format and check that `drizzle-kit generate` reports no changes after each update (checked 2026-11-18).
- Keep the 24-hour pnpm release-age policy. It withheld SvelteKit 3.3.1, adapter-vercel 7.0.4, Prettier's Svelte plugin 4.2.0, Svelte 5.58.0, and `@vercel/nft` 1.11.7 on 2026-11-18. Retry when the releases meet the age requirement.
- [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) affects transitive `picomatch` 4.0.7 in the build and check tools. No patched version is available, and the production audit is clean. Recheck when `picomatch` publishes a fix (checked 2026-11-18).
- Only `build-prod` runs database migrations as part of the build. Use `build` for checks that must not write to the database.
