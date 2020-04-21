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
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    expect(host).toBeInstanceOf(Host)
  })

  it('return an empty top apps array when there are no apps', () => {
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    expect(host.getTopApps(10)).toStrictEqual([])
  })

  it('do not modify an added app', () => {
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    Object.freeze(app)

    host.addApp(app)
  })

  it('returns an added app', () => {
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    host.addApp(app)

    const topApps = host.getTopApps(10)

    expect(topApps).toStrictEqual([app])
  })

  it('adds a smaller apdex app in descendent order', () => {
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    const appA = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    const appB = new Application({
      name: 'B',
      version: 2,
      apdex: 50,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    host.addApp(appA)
    host.addApp(appB)

    const topApps = host.getTopApps(10)

    expect(topApps).toStrictEqual([appA, appB])
  })

  it('adds a higher apdex app in descendent order', () => {
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    const appA = new Application({
      name: 'A',
      version: 2,
      apdex: 70,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    const appB = new Application({
      name: 'B',
      version: 2,
      apdex: 82,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    host.addApp(appA)
    host.addApp(appB)

    const topApps = host.getTopApps(10)

    expect(topApps).toStrictEqual([appB, appA])
  })
})
