import {
  ActionFunction,
  Form,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import createUrl from "~/lib/createUrl.server";
import getTotalUrls from "~/lib/getTotalUrls.server";

import indexStyles from "~/styles/index.css";

export const links = () => {
  return [{ rel: "stylesheet", href: indexStyles }];
};

export const loader: LoaderFunction = async () => {
  const totalUrls = await getTotalUrls();

  return { totalUrls };
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
  const { totalUrls } = useLoaderData();
  const { result, error } = useActionData() || {};
  const { state } = useTransition();

  return (
    <main>
      <h1>urls.wtf</h1>
      <p>minimalistic url shortener.</p>
      <p>no tracking.</p>
      <p>no ads.</p>

      <Form className="url-form" method="post">
        <input
          id="urlInput"
          name="url"
          placeholder="Type in your url..."
          aria-label="Enter an URL to shorten"
        />

        <button type="submit">Go!</button>
      </Form>

      <div className="results">
        {result && (
          <>
            <a href={result} target="_blank" rel="noopener noreferer">
              {result}
            </a>
            <button>copy</button>
          </>
        )}

        {error && <p>{error}</p>}

        {state === "submitting" && <p>loading</p>}
      </div>

      <p style={{ marginTop: "4rem" }}>{totalUrls} urls registered so far</p>
      <a href="https://github.com/jfranciscosousa/urls.wtf">View Github</a>
    </main>
  );
}
