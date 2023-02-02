import getUrl from "$lib/server/urlService";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  const url = await getUrl(params.hashedUrl as string);

  setHeaders({
    "cache-control": "s-maxage=3600",
  });

  if (!url) throw error(404);

  return { url };
};
