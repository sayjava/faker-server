import { Handlebars, HelperOptions } from "../../deps.ts";

Handlebars.registerHelper(
  "var",
  function (name: string, value: number | string, options: HelperOptions) {
    options.data.root[name] = value;
  },
);
