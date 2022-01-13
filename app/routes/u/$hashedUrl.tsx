import { LoaderFunction, redirect } from "remix";
import getUrl from "~/lib/getUrl.server";

export const loader: LoaderFunction = async ({ params }) => {
  const url = await getUrl(params.hashedUrl as string);

  if (!url) return new Response(null, { status: 404 });

  return new Response(null, { status: 301, headers: { location: url } });
};
