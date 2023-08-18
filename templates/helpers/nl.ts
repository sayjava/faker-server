import { Handlebars } from '../../deps.ts'

/**
 * Replace newlines with <br> tags.
 */
Handlebars.registerHelper('nlbr', function (text: string) {
  // Replace newlines with escape characters
  const escapedText = text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '\\n')
  // Surround the text with double quotes
  const jsonString = '"' + escapedText + '"'
  return jsonString
})
