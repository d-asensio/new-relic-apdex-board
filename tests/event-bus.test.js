import { EventBus } from '../src/utils'

describe('EventBus', () => {
  it('is created', () => {
    const eventBus = new EventBus()

    expect(eventBus).toBeInstanceOf(EventBus)
  })

  it('throws an error if the passed listener to "eventBus.on()" is not a function', () => {
    const eventBus = new EventBus()

    expect(() => {
      eventBus.on('invalidListener', null)
    }).toThrowErrorMatchingSnapshot()
  })

  it('throws an error if the passed listener to "eventBus.off()" is not a function', () => {
    const eventBus = new EventBus()

    expect(() => {
      eventBus.off('invalidListener', null)
    }).toThrowErrorMatchingSnapshot()
  })

  it('calls attached listener', async () => {
    const listener = jest.fn()
    const eventBus = new EventBus()

    eventBus.on('event', listener)
    await eventBus.emit('event')

    expect(listener.mock.calls.length).toBe(1)
  })

  it('calls attached listener with data', async () => {
    const listener = jest.fn()
    const eventBus = new EventBus()

    const dataParam1 = {}
    const dataParam2 = 'second paramenter'

    eventBus.on('event', listener)
    await eventBus.emit('event', dataParam1, dataParam2)

    expect(listener.mock.calls[0][0]).toBe(dataParam1)
    expect(listener.mock.calls[0][1]).toBe(dataParam2)
  })

  it('calls multiple attached listeners', async () => {
    const listener = jest.fn()
    const listener2 = jest.fn()
    const eventBus = new EventBus()

    eventBus.on('event', listener)
    eventBus.on('event', listener2)

    await eventBus.emit('event')

    expect(listener.mock.calls.length).toBe(1)
    expect(listener2.mock.calls.length).toBe(1)
  })

  it('do not call a attached event if unregistered trough the retuned unregister function', async () => {
    const listener = jest.fn()
    const eventBus = new EventBus()

    const unregister = eventBus.on('event', listener)
    unregister()

    await eventBus.emit('event')

    expect(listener.mock.calls.length).toBe(0)
  })

  it('do not call a attached event if unregistered trough "eventBus.off()"', async () => {
    const listener = jest.fn()
    const eventBus = new EventBus()

    eventBus.on('event', listener)
    eventBus.off('event', listener)

    await eventBus.emit('event')

    expect(listener.mock.calls.length).toBe(0)
  })

  it('do not fail when emitting unexisting event', async () => {
    const eventBus = new EventBus()

    await eventBus.emit('event')
  })

  it('do not fail when removing unexisting event', async () => {
    const eventBus = new EventBus()

    eventBus.off('event', () => {})
  })
})
