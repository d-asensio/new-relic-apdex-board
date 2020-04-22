let idCounter = -1

export function uniqueId (prefix = '') {
  return `${prefix}${++idCounter}`
}
