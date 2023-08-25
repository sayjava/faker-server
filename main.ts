import { parser, Server } from "./deps.ts";
import { createHandler as createGraphQLHandler } from "./graphql/handler.ts";
import "./templates/helpers/helpers.ts";

const {
  tls,
  port = 8080,
  templates = "templates",
} = parser.parse(Deno.args);

const graphqlHandler = createGraphQLHandler({ templateDir: templates });

const server = new Server({
  handler: (req) => {
    const { pathname } = new URL(req.url);

    if (pathname.includes("graphql")) {
      return graphqlHandler(req);
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
  port: parseInt(port),
});

if (tls) {
  server.listenAndServeTls("./certs/cert.pem", "./certs/private.pem");
  console.log(`Server listening on port ${port} with TLS`);
} else {
  server.listenAndServe();
  console.log(`Server listening on port ${port}`);
}

Deno.addSignalListener("SIGINT", () => {
  server.close();
  console.log("faker-server stopped");
  Deno.exit(0);
});