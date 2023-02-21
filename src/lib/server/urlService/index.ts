import graphqlRequest from "../graphqlRequest";
import secureRandomString from "../secureRandomString";
import validateUrl from "./validateUrl";

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

export async function createUrl(rawUrl: string): Promise<string> {
  const url = /^https{0,1}:\/\//.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  const isValidUrl = validateUrl(url);

  if (!isValidUrl) throw new Error("invalid_url");

  const existentHash = await findExistentHash(url);

  if (existentHash) return existentHash;

  const hash = secureRandomString(8);
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

export default async function getUrl(hash: string): Promise<string | undefined> {
  const query = `
    query getUrl($hash: String!) {
      hashedUrlFromHash(hash: $hash) {
        url
      }
    }
  `;

  const data = await graphqlRequest(query, { hash });

  if (!data.hashedUrlFromHash) return undefined;

  return data.hashedUrlFromHash.url;
}

export async function getUrlCount() {
  const query = `
    {
      allHashedUrlsCount
    }
  `;

  const data = await graphqlRequest(query);

  return data.allHashedUrlsCount;
}
