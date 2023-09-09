import { Client, fql } from "fauna";
import { FAUNADB_SECRET } from "$env/static/private";

import secureRandomString from "./secureRandomString";
import validateUrl from "./validateUrl";

const client = new Client({ secret: FAUNADB_SECRET });

type HashedUrl = {
  hash: string;
  url: string;
};

async function getHash(url: string): Promise<string | undefined> {
  const response = await client.query<{ data: HashedUrl[] }>(fql`HashedUrl.getHashByUrl(${url})`);

  return response.data.data[0]?.hash;
}

export async function createUrl(rawUrl: string): Promise<string> {
  const url = /^https{0,1}:\/\//.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  const isValidUrl = validateUrl(url);

  if (!isValidUrl) throw new Error("invalid_url");

  const existentHash = await getHash(url);

  if (existentHash) return existentHash;

  const hash = secureRandomString(8);

  const response = await client.query<HashedUrl>(
    fql`HashedUrl.create({url: ${url}, hash: ${hash}})`,
  );

  return response.data.hash;
}

export default async function getUrl(hash: string): Promise<string | undefined> {
  const response = await client.query<{ data: HashedUrl[] }>(fql`HashedUrl.getUrlByHash(${hash})`);

  return response.data.data[0]?.url;
}
