import { getErrorMessage } from "$lib/getErrorMessage";
import { createUrl } from "$lib/server/urlService";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({
    "cache-control": "s-maxage=3600",
  });

  return {};
};

export const actions: Actions = {
  default: async ({ request }) => {
    try {
      throw new Error("disabled");
      const formData = await request.formData();
      const hashedUrl = await createUrl(formData.get("url") as string);
      const origin = request.headers.get("origin");

      return {
        result: `${origin}/u/${hashedUrl}`,
      };
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  },
};
