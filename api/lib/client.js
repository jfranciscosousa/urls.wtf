// eslint-disable-next-line
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const { gql, GraphQLClient } = require("graphql-request");

const graphQLClient = new GraphQLClient("https://graphql.fauna.com/graphql", {
  headers: {
    authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
  },
});

module.exports = { gql, graphQLClient };
