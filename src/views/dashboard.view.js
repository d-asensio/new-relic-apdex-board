/** @jsx jsx */
import jsx from '../jsx-runtime'

import { HostView } from './host.view'

export class DashboardView {
  create (dashboard) {
    return (
      <div className='Dashboard'>
        <div className='Dashboard__Header'>
          <div className='Dashboard__HeaderInfo'>
            <div className='Dashboard__Title'>Apps by Host</div>
            <div className='Dashboard__Caption'>
              for user {dashboard.user}
            </div>
          </div>
          <div className='Dashboard__HeaderControls'>
            <label className='Toggle'>
              <input type='checkbox' />
              <span className='Toggle__Mark' />
              Show as list
            </label>
          </div>
        </div>
        <div className='Dashboard__Content'>
          {this._createHostElements(dashboard.hosts)}
        </div>
      </div>
    )
  }

  _createHostElements (hosts) {
    const hostViews = []

    for (const [, host] of hosts) {
      const hostView = new HostView()

      hostViews.push(
        hostView.create(host)
      )
    }

    return hostViews
  }
}
