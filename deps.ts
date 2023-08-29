export { Server } from "https://deno.land/std@0.166.0/http/server.ts";
export { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts";
export { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
export { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";
export { existsSync } from "https://deno.land/std@0.199.0/fs/mod.ts";
export {
  buildClientSchema,
  buildSchema,
  GraphQLSchema,
  printSchema,
} from "npm:graphql@15.5.0";
export * as Faker from "npm:@faker-js/faker";
export * as parser from "https://deno.land/std@0.194.0/flags/mod.ts";

import * as objectPath from "npm:object-path";
export { objectPath };

export type {
  ArgumentNode,
  DirectiveNode,
  GraphQLFieldMap,
  GraphQLFieldResolver,
  GraphQLResolveInfo,
  SelectionNode,
} from "npm:graphql@15.5.0";

import Handlebars from "npm:handlebars@4.7.6";
export type { HelperOptions, TemplateDelegate } from "npm:handlebars@4.7.6";
export { Handlebars };

export type ServerContext = {
  variables: Record<string, string | number | boolean>;
  headers: Record<string, string | number | boolean>;
  cookies: Record<string, string | number | boolean>;
  request: Request;
};

export * as logger from "https://deno.land/std@0.199.0/log/mod.ts";
export * as cors from "https://deno.land/x/edge_cors/src/cors.ts";

export const logRequest = (req: Request, extra: Record<string, string>) => {
  return JSON.stringify({
    ...extra,
    timestamp: new Date().toISOString(),
    httpRequest: {
      requestMethod: req.method,
      requestUrl: req.url,
      httpVersion: req.headers.get("version"),
      headers: Object.fromEntries(req.headers.entries()),
      referer: req.headers.get("referrer"),
      userAgent: req.headers.get("user-agent"),
    },
  });
};
