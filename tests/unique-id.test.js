import { uniqueId } from '../src/utils'

describe('uniqueId', () => {
  it('generates a string id', () => {
    expect(typeof uniqueId()).toBe('string')
  })

  it('generates a prefixed id', () => {
    const prefix = 'id_pref_'
    const generatedId = uniqueId(prefix)

    expect(generatedId.startsWith(prefix)).toBe(true)
  })

  it('generates a random number of unique ids', () => {
    const nIds = Math.floor(Math.random() * 100)
    const idMap = {}

    for (let i = 0; i < nIds; i++) {
      idMap[uniqueId()] = true
    }

    const nDifferentIds = Object.keys(idMap).length

    expect(nDifferentIds).toBe(nIds)
  })
})
