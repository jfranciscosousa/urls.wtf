import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { MetaFunction } from "remix";

import rootStyles from "./styles/root.css";
import React from "react";

export const links = () => {
  return [{ rel: "stylesheet", href: rootStyles }];
};

export const meta: MetaFunction = () => {
  return { title: "urls.wtf" };
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <React.StrictMode>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </html>
    </React.StrictMode>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <>
          <p>
            Oops! Looks like you tried to visit a page that you do not have
            access to.
          </p>

          <a href="/">Go back home</a>
        </>
      );
      break;
    case 404:
      message = (
        <>
          <p>Oops! Looks like you tried to visit a page that does not exist.</p>

          <a href="/">Go back home</a>
        </>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <main>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Error!">
      <div>
        <h1>Oh god everything is on fire please help.</h1>

        <h2>A massive error exploded our servers. We are trying to fix it!</h2>

        <a href="/">Go back home</a>
      </div>
    </Document>
  );
}
