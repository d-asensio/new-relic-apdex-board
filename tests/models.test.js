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

  it('the id is not modificable', () => {
    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    expect(() => {
      app.id = 'new_id'
    }).toThrowError()
  })

  it('has name', () => {
    const name = 'A'

    const app = new Application({
      name,
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    expect(app.name).toBe(name)
  })

  it('the name is not modificable', () => {
    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    expect(() => {
      app.name = 'new_name'
    }).toThrowError()
  })

  it('has version', () => {
    const version = 2

    const app = new Application({
      name: 'A',
      version,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    expect(app.version).toBe(version)
  })

  it('the version is not modificable', () => {
    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    expect(() => {
      app.version = 5
    }).toThrowError()
  })

  it('has apdex', () => {
    const apdex = 55

    const app = new Application({
      name: 'A',
      version: 2,
      apdex,
      contributors: [
        'John Doe'
      ]
    })

    expect(app.apdex).toBe(apdex)
  })

  it('the apdex is not modificable', () => {
    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    expect(() => {
      app.apdex = 58
    }).toThrowError()
  })

  it('has contributors', () => {
    const contributors = [
      'John Doe'
    ]

    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors
    })

    expect(app.contributors).toBe(contributors)
  })

  it('contributors are not modificable', () => {
    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    expect(() => {
      app.contributors = []
    }).toThrowError()
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

  it('has user', () => {
    const user = 'some.one@newrelic.com'

    const dashboard = new Dashboard({
      user
    })

    expect(dashboard.user).toBe(user)
  })

  it('the user is not modificable', () => {
    const dashboard = new Dashboard({
      user: 'some.one@newrelic.com'
    })

    expect(() => {
      dashboard.user = 'some.other@newrelic.com'
    }).toThrowError()
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

    const hasApp = dashboard.hasAppId(app.id)

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

    const gotApp = dashboard.getAppById(app.id)

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

    const hasHost = dashboard.hasHostId(host.id)

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

    const gotHost = dashboard.getHostById(host.id)

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

  it('adds a smaller apdex apps in descendent order', () => {
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

    const appC = new Application({
      name: 'B',
      version: 2,
      apdex: 52,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    host.addApp(appA)
    host.addApp(appB)
    host.addApp(appC)

    const topApps = host.getTopApps(10)

    expect(topApps).toStrictEqual([appA, appC, appB])
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

  it('removes a single app', () => {
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
      apdex: 30,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    const appC = new Application({
      name: 'C',
      version: 2,
      apdex: 19,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    host.addApp(appC)
    host.addApp(appA)
    host.addApp(appB)

    host.removeApp(appB)

    const topApps = host.getTopApps(10)

    expect(topApps).toStrictEqual([appA, appC])
  })

  it('removes all the apps', () => {
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
      apdex: 30,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    const appC = new Application({
      name: 'C',
      version: 2,
      apdex: 19,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    host.addApp(appC)
    host.addApp(appA)
    host.addApp(appB)

    host.removeApp(appA)
    host.removeApp(appC)
    host.removeApp(appB)

    const topApps = host.getTopApps(10)

    expect(topApps).toStrictEqual([])
  })

  it('throws an error when attempting to remove a unexisting app', () => {
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    const appA = new Application({
      name: 'A',
      version: 2,
      apdex: 19,
      contributors: [
        'John Doe'
      ],
      host: [
        'a2f3d.host.com'
      ]
    })

    expect(() => {
      host.removeApp(appA)
    }).toThrowErrorMatchingSnapshot()
  })
})
