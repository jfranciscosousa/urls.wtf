import React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import { MetaFunction } from "@remix-run/server-runtime";

import styles from "./tailwind.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
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
      <html lang="en" className="bg-bluePlaza text-white font-mono">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
        </head>
        <body className="max-w-2xl mx-auto py-40 md:px-8 md:py-20">
          {children}

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
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

          <a className="block mt-4 underline" href="/">
            Go back home
          </a>
        </>
      );
      break;
    case 404:
      message = (
        <>
          <p>Oops! Looks like you tried to visit a page that does not exist.</p>

          <a className="block mt-4 underline" href="/">
            Go back home
          </a>
        </>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <main>
        <h1 className="text-4xl font-bold mb-8">
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
