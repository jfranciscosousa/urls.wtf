import secureRandomString from "secure-random-string";
import graphqlRequest from "./graphqlRequest.server";
import validateUrl from "./validateUrl.server";

async function findExistentHash(url: string) {
  const query = `
    query getHash($url: String!) {
      hashedUrlFromUrl(url: $url) {
        hash
      }
    }
  `;

  const data = await graphqlRequest(query, { url });

  return data.hashedUrlFromUrl && data.hashedUrlFromUrl.hash;
}

export default async function createUrl(rawUrl: string): Promise<string> {
  const url = /^https{0,1}:\/\//.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  const isValidUrl = validateUrl(url);

  if (!isValidUrl) throw new Error("invalid_url");

  const existentHash = await findExistentHash(url);

  if (existentHash) return existentHash;

  const hash = secureRandomString({ length: 8, alphanumeric: true });
  const mutation = `
    mutation CreateHashedUrl($url: String!, $hash: String!) {
      createHashedUrl(data: {
        hash: $hash
        url: $url
      }) {
        url
        hash
      }
    }
  `;

  const data = await graphqlRequest(mutation, { hash, url });

  return data.createHashedUrl.hash;
}
