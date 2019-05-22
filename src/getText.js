import text from './text/index'

const format = require('format')

const language = 'zh'

export default function getText (key, ...arr) {
  let res = 'TEXT_NOT_FOUND'
  if (!arr) {arr = []}
  if (text[key]) {
    if (text[key][language]) {
      res = text[key][language]
    } else {
      res = text[key].default
    }
  }
  return format.apply(undefined, [res].concat(arr))
}
