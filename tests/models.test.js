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

  it('generates an id', () => {
    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    expect(app.id).toBeDefined()
  })

  it('can be compared to another app', () => {
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
    const dashboard = new Dashboard({
      user: 'some.one@newrelic.com'
    })

    expect(dashboard).toBeInstanceOf(Dashboard)
  })

  it('adds an app', () => {
    const dashboard = new Dashboard({
      user: 'some.one@newrelic.com'
    })

    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: []
    })

    dashboard.addApp(app)

    const hasApp = dashboard.hasApp(app.id)

    expect(hasApp).toBe(true)
  })

  it('gets an app', () => {
    const dashboard = new Dashboard({
      user: 'some.one@newrelic.com'
    })

    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: []
    })

    dashboard.addApp(app)

    const gotApp = dashboard.getApp(app.id)

    expect(app).toBe(gotApp)
  })

  it('do not modify apps when adding', () => {
    const dashboard = new Dashboard({
      user: 'some.one@newrelic.com'
    })

    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: []
    })

    Object.freeze(app)

    dashboard.addApp(app)
  })

  it('adds a host', () => {
    const dashboard = new Dashboard({
      user: 'some.one@newrelic.com'
    })

    const host = new Host({
      id: 'a2f3d.host.com'
    })

    dashboard.addHost(host)

    const hasHost = dashboard.hasHost(host.id)

    expect(hasHost).toBe(true)
  })

  it('gets a host', () => {
    const dashboard = new Dashboard({
      user: 'some.one@newrelic.com'
    })

    const host = new Host({
      id: 'a2f3d.host.com'
    })

    dashboard.addHost(host)

    const gotHost = dashboard.getHost(host.id)

    expect(gotHost).toBe(host)
  })

  it('gets multiple hosts', () => {
    const dashboard = new Dashboard({
      user: 'some.one@newrelic.com'
    })

    const hostA = new Host({
      id: 'a2f3d.hostA.com'
    })

    const hostB = new Host({
      id: 'a2f3d.hostB.com'
    })

    dashboard.addHost(hostA)
    dashboard.addHost(hostB)

    const allHosts = dashboard.getAllHosts()

    expect(allHosts).toStrictEqual([hostA, hostB])
  })

  it('do not modify hosts when adding', () => {
    const dashboard = new Dashboard({
      user: 'some.one@newrelic.com'
    })

    const host = new Host({
      id: 'a2f3d.host.com'
    })

    Object.freeze(host)

    dashboard.addHost(host)
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
