// deno-lint-ignore-file no-explicit-any
import { Handlebars } from "../../deps.ts";

/**
 * Checks if a value is contained in another array
 */
Handlebars.registerHelper("contains", function (...args: any[]): boolean {
    if (args.length < 2) {
        throw new Error('Handlerbars Helper "contains" needs 2 parameters');
    }

    const [array, value] = args;
    if (!Array.isArray(array)) {
        throw new Error('Helper "contains" needs an array as first parameter');
    }
    return array.includes(value);
});
