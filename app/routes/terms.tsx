import { HeadersFunction, Link } from "remix";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "s-maxage=86400",
  };
};

export default function Terms() {
  return (
    <main className="space-y-8">
      <h1 className="text-6xl font-bold mb-12">urls.wtf</h1>

      <p>
        This website is provided as is. In no way shape or form will the creator
        of this service guarantee the longevity of the links stored on the
        platform.
      </p>

      <p>
        The creator reserves the right to delete any shortened URL they see fit.
        If any shortened link on this platform caused the reader any harm, feel
        free to reach out to the creator so they can delete it.
      </p>

      <p>
        The only data stored in this website are the URLs created by users and
        their shortened versions. Absolutely no other kind of data is stored on
        the database.
      </p>

      <p>
        The vendors used to host the website can store extra information, like
        IP addresses, country of origin and others. These are stats collected by
        the servers of{" "}
        <a
          className="underline"
          target="_blaink"
          rel="noopener noreferrer"
          href="https://cloudflare.com"
        >
          Cloudflare
        </a>
        ,{" "}
        <a
          className="underline"
          target="_blaink"
          rel="noopener noreferrer"
          href="https://faunadb.com"
        >
          FaunaDB
        </a>{" "}
        and{" "}
        <a
          className="underline"
          target="_blaink"
          rel="noopener noreferrer"
          href="https://vercel.com"
        >
          Vercel
        </a>
        , services used to operate the platform.
      </p>

      <p>
        The creator is <b>NOT RESPONSIBLE</b> for any link stored on the
        platform. All of the URLs on shortened on the platform are ANONYMOUS in
        nature, and the creator has <b>NO WAY</b> of finding out where they come
        from.
      </p>

      <p>
        If any URL is putting the reader, or others, in harms way, let the
        creator know and they shall delete the URL in question.
      </p>

      <p>
        For enquiries reach out via email:{" "}
        <a href="mailto:urlswtf@gmail.com">urlswtf@gmail.com</a>
      </p>

      <p>
        TL,DR: do not fucking sue me for fuck's sake. If any shit ass link gave
        you a virus it's not my fault, just send me an email and I'll delete the
        thing.
      </p>

      <Link className="block underline mt-20" to="/">
        Go back to the homepage
      </Link>
    </main>
  );
}
