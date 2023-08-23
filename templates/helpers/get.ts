import { Handlebars, objectPath } from "../../deps.ts";

/**
 * Get a value from an object using its path.
 */
Handlebars.registerHelper("get", function (options) {
  if (!options.hash) {
    throw new Error('Handlebars Helper "get" needs a context and a path');
  }
  const { hash } = options;
  if (!hash.path && !hash.default) {
    throw new Error('Handlebars Helper "get" needs a path or a default');
  }

  return objectPath.default.get(
    hash.context ?? options.data.root ?? {},
    hash.path,
    hash.default,
  );
});
