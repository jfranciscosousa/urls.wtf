import { ERRORS } from "$lib/getErrorMessage";
import prisma from "./prisma";
import secureRandomString from "./secureRandomString";
import validateUrl from "./validateUrl";

async function getHash(url: string): Promise<string | undefined> {
  return prisma.hashedUrl
    .findFirst({
      where: {
        url,
      },
      select: {
        hash: true,
      },
    })
    .then((data) => data?.hash);
}

export async function createUrl(rawUrl: string): Promise<string> {
  const url = /^https{0,1}:\/\//.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  const isValidUrl = validateUrl(url);

  if (!isValidUrl) throw new Error(ERRORS.INVALID_URL);

  const existentHash = await getHash(url);

  if (existentHash) return existentHash;

  const hash = secureRandomString(8);

  return prisma.hashedUrl
    .create({
      data: {
        hash,
        url,
      },
      select: {
        hash: true,
      },
    })
    .then((data) => data.hash);
}

export default async function getUrl(hash: string): Promise<string | undefined> {
  return prisma.hashedUrl
    .findUnique({
      where: {
        hash,
      },
      select: {
        url: true,
      },
      cacheStrategy: {
        ttl: 60 * 60 * 24 * 7, // 1 week
      },
    })
    .then((data) => data?.url);
}
