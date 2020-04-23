/** @jsx jsx */
import jsx from '../jsx-runtime'

import { EventBus } from '../utils'

/**
 * View for the host container.
 */
export class HostView {
  constructor () {
    this._eventBus = new EventBus()

    this._rootElement = null
  }

  create (host) {
    this._rootElement = (
      <div className='Host'>
        <div className='Host__Title' aria-label='host url'>{host.id}</div>
        <div className='Host__AppList'>
          {this._createAppElements(
            host.getTopApps(25)
          )}
        </div>
      </div>
    )

    this._attachRootEvents()

    return this._rootElement
  }

  onClickApp (handler) {
    this._eventBus.on('appClick', handler)
  }

  _createAppElements (apps) {
    return apps.map(app => (
      <div className='Host__App' data-app-id={app.id}>
        <div className='Host__AppApex' aria-label='apex score'>{app.apdex}</div>
        <div className='Host__AppName' aria-label='application name'>{app.name}</div>
      </div>
    ))
  }

  _attachRootEvents () {
    this._rootElement.addEventListener(
      'click',
      this._handleClick.bind(this)
    )
  }

  _handleClick (event) {
    const { appId } = event.target.dataset

    if (appId) {
      this._eventBus.emit(
        'appClick',
        { appId }
      )
    }
  }
}
