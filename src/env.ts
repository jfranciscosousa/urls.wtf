import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  DATABASE_ADAPTER: { static: true },
  DATABASE_URL: { static: true },
});
