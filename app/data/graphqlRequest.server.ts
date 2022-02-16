export default async function graphqlRequest(
  query: string,
  variables?: Record<string, any>
): Promise<any> {
  const response = await fetch("https://graphql.fauna.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await response.json();

  return json?.data;
}
