const secureRandom = require("secure-random-string");
const { gql, graphQLClient } = require("./client");
const validateUrl = require("./utils/validateUrl");

async function findExistentHash(url) {
  const query = gql`
    query getHash($url: String!) {
      hashedUrlFromUrl(url: $url) {
        hash
      }
    }
  `;

  const data = await graphQLClient.request(query, { url });

  return data.hashedUrlFromUrl && data.hashedUrlFromUrl.hash;
}

module.exports = async function createUrl(incommingUrl) {
  const url = /^https{0,1}:\/\//.test(incommingUrl)
    ? incommingUrl
    : `https://${incommingUrl}`;
  const isValidUrl = await validateUrl(url);

  if (!isValidUrl) throw new Error("invalid_url");

  const existentHash = await findExistentHash(url);

  if (existentHash) return existentHash;

  const hash = secureRandom({ length: 8, alphanumeric: true });
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

  const data = await graphQLClient.request(mutation, { hash, url });

  return data.createHashedUrl.hash;
};
