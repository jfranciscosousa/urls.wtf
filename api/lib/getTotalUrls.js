const { gql, graphQLClient } = require("./client");

module.exports = async function getTotalUrls() {
  const query = gql`
    {
      allHashedUrlsCount
    }
  `;

  const data = await graphQLClient.request(query);

  return data.allHashedUrlsCount;
};
