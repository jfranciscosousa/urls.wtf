import { ERRORS, getErrorMessage } from "#lib/getErrorMessage.js";
import { Effect } from "effect";
import { createUrl } from "#lib/server/urlService.js";
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
      const formData = await request.formData();
      return await Effect.runPromise(
        createUrl(formData.get("url")).pipe(
          Effect.map((hash) => ({
            result: `${request.headers.get("origin")}/u/${hash}`,
          })),
          Effect.catchTags({
            InvalidUrl: () => Effect.succeed({ error: ERRORS.INVALID_URL }),
            DatabaseError: (error) => {
              console.error(error);
              return Effect.succeed({ error: ERRORS.UNKNOWN_ERROR });
            },
          }),
        ),
      );
    } catch (error) {
      console.error(error);

      return { error: getErrorMessage(error) };
    }
  },
};
