export { Server } from "https://deno.land/std@0.166.0/http/server.ts";
export { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts";
export { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
export { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";
export { buildClientSchema, buildSchema, printSchema, GraphQLSchema } from "npm:graphql@15.5.0";
export * as Faker from "npm:@faker-js/faker";
export * as objectPath from "npm:object-path";

export type { GraphQLFieldMap, GraphQLFieldResolver, GraphQLResolveInfo, DirectiveNode, SelectionNode, ArgumentNode } from "npm:graphql@15.5.0"


import Handlebars from 'npm:handlebars@4.7.6';
export { Handlebars };

export type ServerContext = {
    variables: Record<string, any>;
    headers: Record<string, any>;
    cookies: Record<string, any>;
}