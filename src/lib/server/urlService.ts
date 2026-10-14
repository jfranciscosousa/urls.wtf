import { eq } from "drizzle-orm";
import { Effect, Schema, SchemaGetter } from "effect";
import { db } from "./db";
import { hashedUrls } from "./schema";
import secureRandomString from "./secureRandomString";
import validateUrl from "./validateUrl";

export class InvalidUrl extends Schema.TaggedError<InvalidUrl>()("InvalidUrl", {}) {}

export class DatabaseError extends Schema.TaggedError<DatabaseError>()("DatabaseError", {
  cause: Schema.Defect(),
}) {}

const Url = Schema.String.pipe(
  Schema.decodeTo(Schema.String.check(Schema.makeFilter(validateUrl)), {
    decode: SchemaGetter.transform((url) =>
      /^https{0,1}:\/\//.test(url) ? url : `https://${url}`,
    ),
    encode: SchemaGetter.transform((url) => url),
  }),
);
const decodeUrl = Schema.decodeUnknownEffect(Url);

export const createUrl = Effect.fn("createUrl")(function* (rawUrl: unknown) {
  const url = yield* decodeUrl(rawUrl).pipe(Effect.mapError(() => new InvalidUrl()));

  const [existingUrl] = yield* Effect.tryPromise({
    try: () =>
      db.select({ hash: hashedUrls.hash }).from(hashedUrls).where(eq(hashedUrls.url, url)).limit(1),
    catch: (cause) => new DatabaseError({ cause }),
  });

  if (existingUrl) return existingUrl.hash;

  const hash = secureRandomString(8);
  const [createdUrl] = yield* Effect.tryPromise({
    try: () => db.insert(hashedUrls).values({ hash, url }).returning({ hash: hashedUrls.hash }),
    catch: (cause) => new DatabaseError({ cause }),
  });

  return createdUrl!.hash;
});

export default function getUrl(hash: string) {
  return Effect.tryPromise({
    try: () =>
      db.select({ url: hashedUrls.url }).from(hashedUrls).where(eq(hashedUrls.hash, hash)).limit(1),
    catch: (cause) => new DatabaseError({ cause }),
  }).pipe(Effect.map(([hashedUrl]) => hashedUrl?.url));
}
