import {
  buildClientSchema,
  GraphQLHTTP,
  makeExecutableSchema,
  printSchema,
  Server,
} from "./deps.ts";
import { createResolvers } from "./graphql/resolvers.ts";
import "./templates/helpers/helpers.ts";

const schemaJSON = Deno.readTextFileSync("./presets/shopify/schema.json");
const { data: introspection } = JSON.parse(schemaJSON);
const schema = buildClientSchema(introspection);
const resolvers = createResolvers({ schema, templateDir: "presets/shopify" });

interface ServerContext {
  headers: { [key: string]: string };
  variables: { [key: string]: string | number | boolean };
  templateDir: string;
}

const server = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    const cReq = req.clone();
    const { variables, headers } = await cReq.json();

    if (pathname.includes("graphql")) {
      const response = await GraphQLHTTP<Request>({
        schema: makeExecutableSchema({
          typeDefs: printSchema(schema),
          resolvers,
        }),
        graphiql: true,
        contextValue: {
          headers,
          variables,
          templateDir: "presets/shopify",
        },
      })(req);
      return response;
    }

    return new Response("Not Found", {
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
          "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
      },
    });
  },
  port: 8080,
});

server.listenAndServeTls("./certs/cert.pem", "./certs/private.pem");
console.log("Server listening on https://localhost:8080/graphql");
