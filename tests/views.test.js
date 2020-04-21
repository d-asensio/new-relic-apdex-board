import { Host, Application, Dashboard } from '../src/models'
import { HostView, DashboardView } from '../src/views'

describe('Host view', () => {
  it('is constructed', () => {
    const hostView = new HostView()

    expect(hostView).toBeInstanceOf(HostView)
  })

  it('is created from model', () => {
    const hostView = new HostView()
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    const hostElement = hostView.create(host)

    expect(hostElement).toBeInstanceOf(HTMLElement)
  })

  it('is has the proper structure', () => {
    const hostView = new HostView()
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    host.apps.push(
      new Application({
        name: 'A',
        version: 2,
        apdex: 55,
        contributors: [
          'John Doe'
        ]
      })
    )

    const hostElement = hostView.create(host)

    expect(hostElement).toMatchSnapshot()
  })
})

describe('Dashboard view', () => {
  it('is constructed', () => {
    const dashboardView = new DashboardView()

    expect(dashboardView).toBeInstanceOf(DashboardView)
  })

  it('is created from model', () => {
    const dashboardView = new DashboardView()
    const dashboard = new Dashboard({
      user: 'some.user@newrelic.com'
    })

    const dashboardElement = dashboardView.create(dashboard)

    expect(dashboardElement).toBeInstanceOf(HTMLElement)
  })

  it('is has the proper structure', () => {
    const dashboardView = new DashboardView()

    const dashboard = new Dashboard({
      user: 'some.user@newrelic.com'
    })

    const host = new Host({
      id: 'a2f3d.host.com'
    })

    host.apps.push(
      new Application({
        name: 'A',
        version: 2,
        apdex: 55,
        contributors: [
          'John Doe'
        ]
      })
    )

    dashboard.hosts.set(host.id, host)

    const dashboardElement = dashboardView.create(dashboard)

    expect(dashboardElement).toMatchSnapshot()
  })
})
