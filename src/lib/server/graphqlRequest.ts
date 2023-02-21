import { FAUNADB_SECRET } from "$env/static/private";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseBody = any;

export default async function graphqlRequest(
  query: string,
  variables?: Record<string, unknown>,
): Promise<ResponseBody> {
  const response = await fetch("https://graphql.fauna.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${FAUNADB_SECRET}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).catch(() => {
    throw new Error("network_error");
  });

  if (!response.ok) throw new Error("network_error");

  const json = await response.json().catch(() => {
    throw new Error("network_error");
  });

  if (json.errors) throw new Error("faunadb_error");

  return json?.data;
}
