import graphqlRequest from "./graphqlRequest.server";

export default async function getUrl(hash: string) {
  const query = `
    query getUrl($hash: String!) {
      hashedUrlFromHash(hash: $hash) {
        url
      }
    }
  `;

  const data = await graphqlRequest(query, { hash });

  if (!data.hashedUrlFromHash) throw new Error("not_found");

  return data.hashedUrlFromHash.url;
}
