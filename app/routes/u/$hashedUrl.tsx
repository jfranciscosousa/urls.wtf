import { LoaderFunction } from "remix";
import getUrl from "~/lib/urlService";

export const loader: LoaderFunction = async ({ params }) => {
  const url = await getUrl(params.hashedUrl as string);

  if (!url) throw new Response(null, { status: 404 });

  return new Response(null, {
    status: 301,
    headers: { Location: url, "Cache-Control": "s-maxage=300" },
  });
};

export default function UrlRedirect() {
  return null;
}
