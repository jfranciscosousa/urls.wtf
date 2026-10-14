import getUrl from "#lib/server/urlService.js";
import { error } from "@sveltejs/kit";
import { Effect } from "effect";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  const url = await Effect.runPromise(getUrl(params.hashedUrl));

  setHeaders({
    "cache-control": "s-maxage=3600",
  });

  if (!url) throw error(404);

  return { url };
};
