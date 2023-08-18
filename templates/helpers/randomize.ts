import { Handlebars } from '../../deps.ts'

/**
 * Select a random value from a list of values.
 */
Handlebars.registerHelper('randomize', function (...args: any) {
  const [, ...rest] = Array.from(args).reverse()
  const randomIdex = Math.floor(Math.random() * rest.length)
  return rest[randomIdex]
})
