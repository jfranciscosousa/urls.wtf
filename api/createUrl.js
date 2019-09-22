const { GraphQLClient } = require("graphql-request");
const secureRandom = require("secure-random-string");
const validateUrl = require("./utils/validateUrl");

const endpoint = "https://graphql.fauna.com/graphql";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
  },
});

async function findExistentHash(url) {
  const query = `
  {
    hashedUrlFromUrl(url: "${url}") {
      hash
    }
  }
`;

  const data = await graphQLClient.request(query);

  return data.hashedUrlFromUrl && data.hashedUrlFromUrl.hash;
}

module.exports = async function createUrl(incommingUrl) {
  const url = /^https{0,1}:\/\//.test(incommingUrl)
    ? incommingUrl
    : `https://${incommingUrl}`;
  const isValidUrl = validateUrl(url);

  if (!isValidUrl) throw new Error("invalid_url");

  const existentHash = await findExistentHash(url);

  if (existentHash) return existentHash;

  const hash = secureRandom({ length: 8, alphanumeric: true });
  const mutation = `
    mutation {
      createHashedUrl(data: {
        hash: "${hash}"
        url: "${url}"
      }) {
        url
        hash
      }
    }
  `;

  const data = await graphQLClient.request(mutation);

  return data.createHashedUrl.hash;
};
