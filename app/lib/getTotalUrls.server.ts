import graphqlRequest from "./graphqlRequest.server";

export default async function getTotalUrls() {
  const query = `
    {
      allHashedUrlsCount
    }
  `;

  const data = await graphqlRequest(query);

  return data.allHashedUrlsCount;
}
