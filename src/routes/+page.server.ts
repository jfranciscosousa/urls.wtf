import { createUrl } from "$lib/server/urlService";
import type { Actions } from "./$types";

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();
			const hashedUrl = await createUrl(formData.get("url") as string);
			const origin = request.headers.get("origin");

			return {
				result: `${origin}/u/${hashedUrl}`,
			};
		} catch (error) {
			return { error: (error as any).message };
		}
	},
};
