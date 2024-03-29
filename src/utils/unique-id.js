/**
 * Toy unique id generator. It is a singleton.
 */

let idCounter = -1

export function uniqueId (prefix = '') {
  return `${prefix}${++idCounter}`
}
