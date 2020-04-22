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

  it('changes the toggle text when the user clicks it', () => {
    const dashboardView = new DashboardView()
    const dashboard = new Dashboard({
      user: 'some.user@newrelic.com'
    })

    const dashboardElement = dashboardView.create(dashboard)

    const toggleElement = dashboardElement.querySelector('.Toggle')
    toggleElement.click()

    expect(dashboardElement).toMatchSnapshot()
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
