// deno-lint-ignore-file no-explicit-any
import { Handlebars } from "../../deps.ts";

/**
 * Create an object from a list of arguments
 */
Handlebars.registerHelper("object", function ({ hash }) {
  return hash;
});

/**
 * Create an array from a list of arguments
 */
Handlebars.registerHelper("array", function (...args: any[]) {
  return Array.from(args).slice(0, args.length - 1);
});
