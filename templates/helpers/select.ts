// deno-lint-ignore-file no-explicit-any
import { Handlebars } from "../../deps.ts";

/**
 * Select the first non-empty value from a list of values.
 */
Handlebars.registerHelper("select", function (...args: any[]) {
  const [, ...rest] = args.concat().reverse();

  return rest.reverse().find((v: any) => {
    if (v === undefined || v === null || v === "") {
      return false;
    }

    return true;
  });
});
