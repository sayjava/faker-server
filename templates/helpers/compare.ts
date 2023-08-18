import { Handlebars } from '../../deps.ts'

/**
 * Handlebars helper to compare two values.
 */
Handlebars.registerHelper(
  'compare',
  function (lvalue: any, rvalue: any, options: any) {
    if (arguments.length < 3) {
      throw new Error('Handlerbars Helper "compare" needs 2 parameters')
    }

    const operator = options.hash.operator ?? '=='

    const operators: any = {
      '==': function (l: any, r: any) {
        return l == r
      },
      '===': function (l: any, r: any) {
        return l === r
      },
      '!=': function (l: any, r: any) {
        return l != r
      },
      '<': function (l: any, r: any) {
        return l < r
      },
      '>': function (l: any, r: any) {
        return l > r
      },
      '<=': function (l: any, r: any) {
        return l <= r
      },
      '>=': function (l: any, r: any) {
        return l >= r
      },
      typeof: function (l: any, r: any) {
        return typeof l === r
      }
    }

    if (!operators[operator]) {
      throw new Error(
        `Handlebars Helper "compare" doesn't know the operator ${String(operator)}`
      )
    }

    const result = operators[operator](lvalue, rvalue)

    if (result) {
      return options.fn(this)
    }

    return options.inverse(this)
  }
)
