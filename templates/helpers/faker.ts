import { Handlebars, objectPath, Faker } from '../../deps.ts'

/**
 * Handlebars helper to generate mock data using fakerjs.
 */
const fake = new Faker.Faker({ locale: [Faker.en, Faker.base] as Faker.LocaleDefinition[] })
Handlebars.registerHelper('faker', function (...args: any[]): any {
  const [type, ...rest] = args
  const fakeFunc = objectPath.default.get(fake, type)
  const [{ hash }, ...params] = rest.concat().reverse()

  if (fakeFunc !== undefined) {
    if (Object.keys(hash).length > 0) {
      return fakeFunc(hash)
    }

    return fakeFunc(...params)
  } else {
    throw new Error(`fakerjs does not support ${String(type)}`)
  }
})
