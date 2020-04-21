export class EventBus {
  constructor () {
    this._events = new Map()
  }

  on (eventName, listener) {
    this._isValidListenerOrThrow(listener)
    this._registerEventListener(eventName, listener)

    return () => {
      this.off(eventName, listener)
    }
  }

  off (eventName, listener) {
    this._isValidListenerOrThrow(listener)
    this._unregisterEventListener(eventName, listener)
  }

  async emit (eventName, ...eventData) {
    await this._callEventListeners(eventName, eventData)
  }

  _registerEventListener (eventName, listener) {
    const eventListeners = this._getOrCreateEventListeners(eventName)

    eventListeners.add(listener)
  }

  _unregisterEventListener (eventName, listener) {
    const eventListeners = this._getOrCreateEventListeners(eventName)

    eventListeners.delete(listener)
  }

  async _callEventListeners (eventName, eventData) {
    const eventListeners = this._getOrCreateEventListeners(eventName)

    for (const listener of eventListeners) {
      await (async function IIFE (closuredEventData) {
        listener(...closuredEventData)
      })(eventData)
    }
  }

  _isValidListenerOrThrow (listener) {
    if (typeof listener !== 'function') {
      throw new TypeError(
        'The event listener must be a function.'
      )
    }
  }

  _getOrCreateEventListeners (eventName) {
    if (!this._hasEvent(eventName)) {
      this._events.set(eventName, new Set())
    }

    return this._getListenersOfEvent(eventName)
  }

  _getListenersOfEvent (eventName) {
    return this._events.get(eventName)
  }

  _hasEvent (eventName) {
    return this._events.has(eventName)
  }
}
