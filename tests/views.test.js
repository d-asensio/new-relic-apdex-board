import { Host, Application } from '../src/models'
import { HostView } from '../src/views'

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
