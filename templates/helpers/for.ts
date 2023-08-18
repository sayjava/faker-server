import { Handlebars } from '../../deps.ts'

/**
 * Handlebars helper to repeat a block of code.
 */
Handlebars.registerHelper('for', function (from: any, to: any) {
  const options = arguments[arguments.length - 1]
  const maxIterations = 100
  let output = ''

  if (Number.isNaN(parseInt(from, 10)) || Number.isNaN(parseInt(to, 10))) {
    throw new Error('Invalid number for for helper')
  }

  if (to < from) {
    throw new Error('Invalid range for for helper')
  }

  from = parseInt(from, 10)
  to = parseInt(to, 10)

  if (to - from >= maxIterations) {
    to = Number(from) + maxIterations - 1
  }

  for (let index = from; index <= to; index++) {
    /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */
    output += options.fn(this, { data: { index } })
  }

  return output
})
