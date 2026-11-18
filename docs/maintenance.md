# Runtime and dependency maintenance

## Toolchain, CI, and deployment

- `.tool-versions` pins Node, pnpm, and PostgreSQL. CI reads the Node and pnpm versions from this file. Keep `packageManager` in `package.json` and the PostgreSQL service image in `.github/workflows/ci.yml` in sync with these pins.
- `vite.config.ts` sets the Vercel function runtime to `nodejs26.x`. Change it together with `engines.node` in `package.json`.
- Only `build-prod` applies database migrations as part of the build. Use `build` for checks that must not write to the database.

## Dependency holds

- Keep TypeScript at 6.0.3 until SvelteKit and `svelte-check` support 7. Both declare TypeScript 6 peers. TypeScript 7.0.2 fails in `svelte-kit sync` (checked 2026-11-18).
- Keep `drizzle-kit` and `drizzle-orm` at `1.0.0-rc.5` until stable 1.x releases are available. This is the latest matched release candidate (checked 2026-11-18). Keep the 1.x snapshot format. After each update, `drizzle-kit generate` must report no schema changes.
- Keep the 24-hour pnpm release-age policy. It withheld SvelteKit 3.3.1, `@sveltejs/adapter-vercel` 7.0.4, `prettier-plugin-svelte` 4.2.0, Svelte 5.58.0, and `@vercel/nft` 1.11.7 on 2026-11-18. Retry when those releases meet the age requirement.

## Dependency audit

- [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) is a high-severity finding in `picomatch` 4.0.7, a transitive dependency of build and check tools. No patched version is available, and the production audit is clean. Recheck when `picomatch` publishes a fix (checked 2026-11-18).
- The 2026-11-18 audit no longer reported the previously documented `deepmerge` finding. The updated `@vercel/nft` tree resolves patched `glob` and `minimatch` versions without overrides.

## Local checks without environment file changes

Set `DATABASE_URL` to a fresh, isolated local test database. Run `mise exec -- pnpm run db:migrate`, then `mise exec -- pnpm run test:e2e`. Playwright uses port 4173. Use an isolated network namespace when other local tests are running. Remove the test database after the checks.
