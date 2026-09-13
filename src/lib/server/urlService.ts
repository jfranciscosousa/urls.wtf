import { ERRORS } from "#lib/getErrorMessage.js";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { hashedUrls } from "./schema";
import secureRandomString from "./secureRandomString";
import validateUrl from "./validateUrl";

async function getHash(url: string): Promise<string | undefined> {
  const [hashedUrl] = await db
    .select({ hash: hashedUrls.hash })
    .from(hashedUrls)
    .where(eq(hashedUrls.url, url))
    .limit(1);

  return hashedUrl?.hash;
}

export async function createUrl(rawUrl: string): Promise<string> {
  const url = /^https{0,1}:\/\//.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  const isValidUrl = validateUrl(url);

  if (!isValidUrl) throw new Error(ERRORS.INVALID_URL);

  const existentHash = await getHash(url);

  if (existentHash) return existentHash;

  const hash = secureRandomString(8);

  const [createdUrl] = await db
    .insert(hashedUrls)
    .values({ hash, url })
    .onConflictDoNothing({ target: hashedUrls.url })
    .returning({ hash: hashedUrls.hash });

  return createdUrl?.hash ?? (await getHash(url))!;
}

export default async function getUrl(hash: string): Promise<string | undefined> {
  const [hashedUrl] = await db
    .select({ url: hashedUrls.url })
    .from(hashedUrls)
    .where(eq(hashedUrls.hash, hash))
    .limit(1);

  return hashedUrl?.url;
}
