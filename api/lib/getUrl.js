const graphQLClient = require("./client");

module.exports = async function getUrl(hash) {
  const query = `
    {
      hashedUrlFromHash(hash: "${hash}") {
        url
      }
    }
  `;

  const data = await graphQLClient.request(query);

  if (!data.hashedUrlFromHash) throw new Error("not_found");

  return data.hashedUrlFromHash.url;
};
