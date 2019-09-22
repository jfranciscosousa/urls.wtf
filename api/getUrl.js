const { GraphQLClient } = require("graphql-request");

const endpoint = "https://graphql.fauna.com/graphql";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
  },
});

module.exports = async function getUrl(hash) {
  const query = `
    {
      hashedUrlFromHash(hash: "${hash}") {
        url
      }
    }
  `;

  const data = await graphQLClient.request(query);

  return data.hashedUrlFromHash && data.hashedUrlFromHash.url;
};
