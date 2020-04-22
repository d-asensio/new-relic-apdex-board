/** @jsx jsx */
import jsx from '../jsx-runtime'

import { HostView } from './host.view'
import { ToggleView } from './toggle.view'

const LAYOUT_LIST_CLASSNAME = 'Dashboard--listLayout'

const LAYOUT_GRID_TEXT = 'Show as list'
const LAYOUT_LIST_TEXT = 'Show as an awesome grid'

export class DashboardView {
  constructor () {
    this._rootElement = null
    this._toggleView = null
  }

  create (dashboard) {
    this._rootElement = (
      <div className='Dashboard'>
        <div className='Dashboard__Header'>
          <div className='Dashboard__HeaderInfo'>
            <div className='Dashboard__Title'>Apps by Host</div>
            <div className='Dashboard__Caption'>
              for user {dashboard.user}
            </div>
          </div>
          <div className='Dashboard__HeaderControls'>
            {this._createToggleElement()}
          </div>
        </div>
        <div className='Dashboard__Content'>
          {this._createHostElements(dashboard.getAllHosts())}
        </div>
      </div>
    )

    this._setLayoutToGrid()

    return this._rootElement
  }

  _createHostElements (hosts) {
    const hostViews = []

    for (const host of hosts) {
      const hostView = new HostView()

      hostViews.push(
        hostView.create(host)
      )
    }

    return hostViews
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

  _handleListLayoutToggle ({ isActive }) {
    if (isActive) {
      this._setLayoutToList()
    } else {
      this._setLayoutToGrid()
    }
  }

  _setLayoutToList () {
    this._rootElement.classList.add(LAYOUT_LIST_CLASSNAME)
    this._toggleView.setLabelText(LAYOUT_LIST_TEXT)
  }

  _setLayoutToGrid () {
    this._rootElement.classList.remove(LAYOUT_LIST_CLASSNAME)
    this._toggleView.setLabelText(LAYOUT_GRID_TEXT)
  }
}
