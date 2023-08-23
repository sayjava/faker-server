// deno-lint-ignore-file no-explicit-any

import { Handlebars } from "../../deps.ts";

/**
 * Handlebars helper to repeat a block of code.
 */
Handlebars.registerHelper(
  "for",
  function (this: any, from: number, to: number) {
    const options = arguments[arguments.length - 1];
    const maxIterations = 100;
    let output = "";

    if (Number.isNaN(Number(from)) || Number.isNaN(Number(to))) {
      throw new Error("Invalid number for for helper");
    }

    if (to < from) {
      throw new Error("Invalid range for for helper");
    }

    if (to - from >= maxIterations) {
      to = Number(from) + maxIterations - 1;
    }

    for (let index = from; index <= to; index++) {
      /* eslint-disable-next-line */
      output += options.fn(this, { data: { index } });
    }

    return output;
  },
);
