// eslint-disable-next-line
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const { GraphQLClient } = require("graphql-request");

const endpoint = "https://graphql.fauna.com/graphql";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
  },
});

module.exports = graphQLClient;
