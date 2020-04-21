import { Application, Dashboard, Host } from '../src/models'

describe('Application model', () => {
  it('is constructed', () => {
    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    expect(app).toBeInstanceOf(Application)
  })

  it('can compared to another app', () => {
    const appA = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: []
    })

    const appB = new Application({
      name: 'B',
      version: 2,
      apdex: 60,
      contributors: []
    })

    const comparison = appA.compareTo(appB)

    expect(comparison).toBe(-5)
  })

  it('has a comparator that can be used to sort in descencent order', () => {
    const appA = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: []
    })

    const appB = new Application({
      name: 'B',
      version: 2,
      apdex: 60,
      contributors: []
    })

    const comparison = Application.byApdexInDescOrder(appA, appB)

    expect(comparison).toBe(5)
  })
})

describe('Dashboard model', () => {
  it('is constructed', () => {
    const app = new Dashboard({
      user: 'some.one@newrelic.com'
    })

    expect(app).toBeInstanceOf(Dashboard)
  })
})

describe('Host model', () => {
  it('is constructed', () => {
    const app = new Host({
      id: 'a2f3d.host.com'
    })

    expect(app).toBeInstanceOf(Host)
  })
})
