import { Handlebars } from '../../deps.ts'

Handlebars.registerHelper(
  'var',
  function (name: string, value: any, options: any) {
    options.data.root[name] = value
  }
)
