/** @jsx jsx */
import jsx from '../jsx-runtime'

import { EventBus } from '../utils'

import { HostView } from './host.view'
import { ToggleView } from './toggle.view'

const LAYOUT_LIST_CLASSNAME = 'Dashboard--listLayout'

const LAYOUT_GRID_TEXT = 'Show as list'
const LAYOUT_LIST_TEXT = 'Show as an awesome grid'

export class DashboardView {
  constructor () {
    this._eventBus = new EventBus()

    this._rootElement = null

    this._toggleView = null
    this._hostViews = []
  }

  create (dashboard) {
    this._rootElement = (
      <main className='Dashboard'>
        <header className='Dashboard__Header'>
          <div className='Dashboard__HeaderInfo'>
            <h1 className='Dashboard__Title'>Apps by Host</h1>
            <div className='Dashboard__Caption'>
              for user {dashboard.user}
            </div>
          </div>
          <div className='Dashboard__HeaderControls'>
            {this._createToggleElement()}
          </div>
        </header>
        <div className='Dashboard__Content'>
          {this._createHostElements(dashboard.getAllHosts())}
        </div>
      </main>
    )

    this.setLayoutToGrid()

    return this._rootElement
  }

  setLayoutToList () {
    this._rootElement.classList.add(LAYOUT_LIST_CLASSNAME)
    this._toggleView.setLabelText(LAYOUT_LIST_TEXT)
  }

  setLayoutToGrid () {
    this._rootElement.classList.remove(LAYOUT_LIST_CLASSNAME)
    this._toggleView.setLabelText(LAYOUT_GRID_TEXT)
  }

  onClickApp (handler) {
    this._eventBus.on('appClick', handler)
  }

  onToggleLayout (handler) {
    this._eventBus.on('layoutToggleChange', handler)
  }

  _createHostElements (hosts) {
    const hostElements = []

    for (const host of hosts) {
      const hostView = new HostView()
      const hostElement = hostView.create(host)

      this._hostViews.push(hostView)
      hostElements.push(hostElement)
    }

    this._attachHostEvents()

    return hostElements
  }

  _createToggleElement () {
    this._toggleView = new ToggleView()

    this._attachToggleEvents()

    return this._toggleView.create()
  }

  _attachToggleEvents () {
    this._toggleView.onToggle(
      this._handleListLayoutToggle.bind(this)
    )
  }

  _attachHostEvents () {
    for (const hostView of this._hostViews) {
      hostView.onClickApp(
        this._handleAppClick.bind(this)
      )
    }
  }

  _handleListLayoutToggle (event) {
    this._eventBus.emit(
      'layoutToggleChange',
      event
    )
  }

  _handleAppClick (event) {
    this._eventBus.emit(
      'appClick',
      event
    )
  }
}
