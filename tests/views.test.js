import { Host, Application, Dashboard } from '../src/models'
import { HostView, DashboardView, ToggleView } from '../src/views'

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

  it('has the proper structure', () => {
    const hostView = new HostView()
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    host.addApp(
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

  it('trigger an event when clicking on an app', () => {
    const handler = jest.fn()
    const hostView = new HostView()
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    host.addApp(app)

    hostView.onClickApp(handler)
    const hostElement = hostView.create(host)

    const appElement = hostElement.querySelector('.Host__App')
    appElement.click()

    expect(handler.mock.calls.length).toBe(1)
    expect(handler.mock.calls[0][0]).toStrictEqual({ appId: app.id })
  })

  it('do not trigger an event when clicking on the host wrapper', () => {
    const handler = jest.fn()
    const hostView = new HostView()
    const host = new Host({
      id: 'a2f3d.host.com'
    })

    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    host.addApp(app)

    hostView.onClickApp(handler)
    const hostElement = hostView.create(host)
    hostElement.click()

    expect(handler.mock.calls.length).toBe(0)
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

  it('has the proper structure', () => {
    const dashboardView = new DashboardView()

    const dashboard = new Dashboard({
      user: 'some.user@newrelic.com'
    })

    const host = new Host({
      id: 'a2f3d.host.com'
    })

    host.addApp(
      new Application({
        name: 'A',
        version: 2,
        apdex: 55,
        contributors: [
          'John Doe'
        ]
      })
    )

    dashboard.addHost(host)

    const dashboardElement = dashboardView.create(dashboard)

    expect(dashboardElement).toMatchSnapshot()
  })

  it('has the propper structure after toggling the layout to list', () => {
    const dashboardView = new DashboardView()
    const dashboard = new Dashboard({
      user: 'some.user@newrelic.com'
    })

    const dashboardElement = dashboardView.create(dashboard)

    const toggleElement = dashboardElement.querySelector('.Toggle')
    toggleElement.click()

    dashboardView.setLayoutToList()

    expect(dashboardElement).toMatchSnapshot()
  })

  it('has the propper structure after toggling the layout to grid', () => {
    const dashboardView = new DashboardView()
    const dashboard = new Dashboard({
      user: 'some.user@newrelic.com'
    })

    const dashboardElement = dashboardView.create(dashboard)

    const toggleElement = dashboardElement.querySelector('.Toggle')
    toggleElement.click()

    dashboardView.setLayoutToList()
    dashboardView.setLayoutToGrid()

    expect(dashboardElement).toMatchSnapshot()
  })

  it('triggers an event when clicking on the layout toggle', () => {
    const handler = jest.fn()

    const dashboardView = new DashboardView()
    const dashboard = new Dashboard({
      user: 'some.user@newrelic.com'
    })

    dashboardView.onToggleLayout(handler)

    const dashboardElement = dashboardView.create(dashboard)

    const toggleElement = dashboardElement.querySelector('.Toggle')
    toggleElement.click()
    toggleElement.click()

    expect(handler.mock.calls.length).toBe(2)
    expect(handler.mock.calls[0][0]).toStrictEqual({ isActive: true })
    expect(handler.mock.calls[1][0]).toStrictEqual({ isActive: false })
  })

  it('triggers an event when clicking on an app', () => {
    const handler = jest.fn()

    const dashboardView = new DashboardView()
    const dashboard = new Dashboard({
      user: 'some.user@newrelic.com'
    })

    const host = new Host({
      id: 'a2f3d.host.com'
    })

    const app = new Application({
      name: 'A',
      version: 2,
      apdex: 55,
      contributors: [
        'John Doe'
      ]
    })

    host.addApp(app)
    dashboard.addHost(host)

    dashboardView.onClickApp(handler)

    const dashboardElement = dashboardView.create(dashboard)

    const appElement = dashboardElement.querySelector('.Host__App')
    appElement.click()

    expect(handler.mock.calls.length).toBe(1)
    expect(handler.mock.calls[0][0]).toStrictEqual({ appId: app.id })
  })
})

it('changes the toggle text back when the user clicks it twice', () => {
  const dashboardView = new DashboardView()
  const dashboard = new Dashboard({
    user: 'some.user@newrelic.com'
  })

  const dashboardElement = dashboardView.create(dashboard)

  const toggleElement = dashboardElement.querySelector('.Toggle')
  toggleElement.click()
  toggleElement.click()

  expect(dashboardElement).toMatchSnapshot()
})

describe('Toggle view', () => {
  it('is constructed', () => {
    const toggleView = new ToggleView()

    expect(toggleView).toBeInstanceOf(ToggleView)
  })

  it('is created', () => {
    const toggleView = new ToggleView()

    const toggleElement = toggleView.create()

    expect(toggleElement).toBeInstanceOf(HTMLElement)
  })

  it('has the proper structure', () => {
    const toggleView = new ToggleView()

    const toggleElement = toggleView.create()

    expect(toggleElement).toMatchSnapshot()
  })

  it('defines the text of the label', () => {
    const labelText = 'This is the text of the label'
    const toggleView = new ToggleView()

    toggleView.setLabelText(labelText)

    const toggleElement = toggleView.create()

    expect(toggleElement.textContent).toBe(labelText)
  })

  it('changes the text of the label (after creating)', () => {
    const labelText = 'This is the text of the label'
    const toggleView = new ToggleView()

    const toggleElement = toggleView.create()

    toggleView.setLabelText(labelText)

    expect(toggleElement.textContent).toBe(labelText)
  })

  it('emits an event when the user clicks on it', () => {
    const handler = jest.fn()
    const toggleView = new ToggleView()

    toggleView.onToggle(handler)

    const toggleElement = toggleView.create()

    toggleElement.click()

    expect(handler.mock.calls.length).toBe(1)
  })
})
