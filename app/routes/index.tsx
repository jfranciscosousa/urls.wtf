import {
  ActionFunction,
  Form,
  HeadersFunction,
  json,
  Link,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { createUrl, getUrlCount } from "~/lib/urlService";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "s-maxage=300",
  };
};

export const loader: LoaderFunction = async () => {
  const urlCount = await getUrlCount();

  return json({ urlCount }, { headers: { "Cache-Control": "s-maxage=300" } });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.formData();
    const hashedUrl = await createUrl(body.get("url") as string);

    return {
      result: `${
        process.env.NODE_ENV === "production" ? "https" : "http"
      }://${request.headers.get("host")}/u/${hashedUrl}`,
    };
  } catch (error) {
    return { error: (error as any).message };
  }
};

export default function Index() {
  const { urlCount } = useLoaderData();
  const { result, error } = useActionData() || {};
  const { state } = useTransition();

  function handleCopy() {
    const inputElement = document.createElement("input");

    inputElement.setAttribute("type", "text");
    inputElement.style = "position: absolute; left: -1000px; top: -1000px";
    document.body.appendChild(inputElement);
    inputElement.value = result;
    inputElement.select();
    document.execCommand("copy");

    inputElement.remove();
  }

  return (
    <>
      <main>
        <h1 className="text-6xl font-bold mb-12">urls.wtf</h1>

        <div className="space-y-1">
          <p>minimalistic url shortener.</p>
          <p>no tracking.</p>
          <p>no ads.</p>
        </div>

        <Form
          className="text-bluePlaza flex items-center space-x-6 mt-12"
          method="post"
        >
          <input
            name="url"
            placeholder="Type in your url..."
            aria-label="Enter an URL to shorten"
            className="p-2 w-full rounded"
          />

          <button className="bg-white p-2 rounded h-full" type="submit">
            Go!
          </button>
        </Form>

        <div className="mt-6">
          <div className="h-8">
            {state !== "submitting" && (
              <>
                {result && (
                  <div className="flex items-center space-x-2">
                    <a href={result} target="_blank" rel="noopener noreferer">
                      {result}
                    </a>

                    <button
                      className="bg-white text-bluePlaza px-2 rounded h-6"
                      onClick={handleCopy}
                    >
                      copy
                    </button>
                  </div>
                )}

                {error && <p>{error}</p>}
              </>
            )}

            {state === "submitting" && <p>loading</p>}
          </div>
        </div>

        <p className="mt-16">{urlCount} urls registered so far</p>
      </main>

      <footer className="mt-24">
        <a
          className="block underline mt-2"
          href="https://github.com/jfranciscosousa/urls.wtf"
        >
          View Github
        </a>

        <Link className="block underline mt-2" to="/terms">
          Terms of Service
        </Link>
      </footer>
    </>
  );
}
