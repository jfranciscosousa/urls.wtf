const graphQLClient = require("./client");

module.exports = async function getTotalUrls() {
  const query = `
    {
      allHashedUrlsCount
    }
  `;

  const data = await graphQLClient.request(query);

  return data.allHashedUrlsCount;
};
