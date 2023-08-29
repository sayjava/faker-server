import { cors, parser, Server } from "./deps.ts";
import { createHandler as createGraphQLHandler } from "./graphql/handler.ts";
import "./templates/helpers/helpers.ts";

const {
  tls,
  port = 8080,
  templates = "templates",
} = parser.parse(Deno.args);

const graphqlHandler = createGraphQLHandler({ templateDir: templates });

const server = new Server({
  // deno-lint-ignore no-explicit-any
  onError: (err: any) => {
    console.log(
      JSON.stringify({ labels: { message: err.message }, httpRequest: {} }),
    );
    return new Response(err.message, { status: 500 });
  },
  handler: async (req) => {
    const { pathname } = new URL(req.url);
    let response = new Response("Not Found", { status: 404 });

    if (pathname.includes("graphql")) {
      response = await graphqlHandler(req);
    }

    return cors.default(req, response);
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
