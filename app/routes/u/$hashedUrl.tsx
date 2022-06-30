import { HeadersFunction, LoaderFunction, useLoaderData } from "remix";
import getUrl from "~/data/urlService";

export const loader: LoaderFunction = async ({ params }) => {
  const url = await getUrl(params.hashedUrl as string);

  if (!url) throw new Response(null, { status: 404 });

  return { url };
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "s-maxage=3600",
  };
};

export default function UrlPage() {
  const { url } = useLoaderData();

  return (
    <main>
      <h1 className="text-6xl font-bold mb-12">urls.wtf</h1>

      <div className="flex flex-col gap-2">
        <p className="bold">
          Click the link below if you wish to be redirected!
        </p>
        <p>Make sure you trust the following website! Double-check the url!</p>
      </div>

      <a href={url} className="underline block mt-8">
        {url}
      </a>
    </main>
  );
}
