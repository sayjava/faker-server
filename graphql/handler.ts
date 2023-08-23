// deno-lint-ignore-file no-explicit-any

import {
  buildClientSchema,
  buildSchema,
  existsSync,
  GraphQLHTTP,
  GraphQLSchema,
  logger,
  makeExecutableSchema,
  printSchema,
} from "../deps.ts";

import { createPresetResolvers } from "../graphql/resolvers.ts";

const sampleSchema = `
type Query {
    hello: String
}
`;

const createSchema = (templateDir: string) => {
  let schema: GraphQLSchema = buildSchema(sampleSchema);
  let resolvers: { [key: string]: any } = {
    Query: {
      hello: () => "Hello Faker Server!",
    },
  };

  const jsonSchemaPath = [templateDir, "schema.json"].join("/");
  const typeDefSchemaPath = [templateDir, "schema.graphql"].join("/");

  if (existsSync(jsonSchemaPath)) {
    const schemaJSON = Deno.readTextFileSync(jsonSchemaPath);
    const { data: introspection } = JSON.parse(schemaJSON);
    schema = buildClientSchema(introspection);
    resolvers = createPresetResolvers({ schema, templateDir });
    logger.info(`Loaded schema from ${jsonSchemaPath}`);
  } else if (existsSync(typeDefSchemaPath)) {
    const schemaText = Deno.readTextFileSync(typeDefSchemaPath);
    schema = buildSchema(schemaText);
    resolvers = createPresetResolvers({ schema, templateDir });
    logger.info(`Loaded schema from ${typeDefSchemaPath}`);
  } else {
    logger.info(`No schema found in ${templateDir}`);
  }

  return makeExecutableSchema({
    typeDefs: printSchema(schema),
    resolvers,
  });
};

export const createHandler = ({ templateDir }: { templateDir: string }) => {
  const schema = createSchema(templateDir);
  return async (req: Request): Promise<Response> => {
    let context = {};

    if (req.method === "POST") {
      const cReq = req.clone();
      const { variables, headers } = await cReq.json();
      context = {
        headers,
        variables,
        templateDir,
      };
    }

    const response = await GraphQLHTTP<Request>({
      schema,
      graphiql: true,
      context: (): any => {
        return context;
      },
    })(req);
    return response;
  };
};
