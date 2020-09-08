const { gql, graphQLClient } = require("./client");

module.exports = async function getUrl(hash) {
  const query = gql`
    query getUrl($hash: String!) {
      hashedUrlFromHash(hash: $hash) {
        url
      }
    }
  `;

  const data = await graphQLClient.request(query, { hash });

  if (!data.hashedUrlFromHash) throw new Error("not_found");

  return data.hashedUrlFromHash.url;
};
