import { useEffect, useState } from "react";
import { GraphiQL } from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";

import "graphiql/graphiql.min.css";

const defaultQuery = `#graphql 
# Welcome to the Quick Shopify GraphQL Explorer
# This is a tool to help you explore the mocked Shopify GraphQL API
# You can use this tool to test queries and mutations before you use them in your app
# To get started, try running a simple query like this one:
query {
    collections(first: 10) {
    totalCount
    nodes {
      title
      products(first: 2) {
        nodes {
          title
        }
      }
    }
  }
}
`;

export const GraphQLExplorer = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  if (!loaded) return <div>Loading Explorer</div>;

  const fetcher = createGraphiQLFetcher({
    url: process.env.SHOPIFY_ENDPOINT,
  });

  return (
    <div style={{ height: "650px" }}>
      <GraphiQL defaultQuery={defaultQuery} fetcher={fetcher} />
    </div>
  );
};
