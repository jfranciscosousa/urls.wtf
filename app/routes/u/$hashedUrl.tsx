import { LoaderFunction } from "remix";
import getUrl from "~/data/urlService";

export const loader: LoaderFunction = async ({ params }) => {
  const url = await getUrl(params.hashedUrl as string);

  if (!url) throw new Response(null, { status: 404 });

  return new Response(null, {
    status: 301, // moved permanently
    headers: { Location: url, "Cache-Control": "s-maxage=300" },
  });
};
