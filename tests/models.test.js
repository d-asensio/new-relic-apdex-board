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
