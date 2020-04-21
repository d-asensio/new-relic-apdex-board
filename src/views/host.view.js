/** @jsx jsx */
import jsx from '../jsx-runtime'

export class HostView {
  create (host) {
    return (
      <div className='Host'>
        <div className='Host__Title'>{host.id}</div>
        <div className='Host__AppList'>
          {this._createAppViews(
            host.getTopApps(25)
          )}
        </div>
      </div>
    )
  }

  _createAppViews (apps) {
    return apps.map(app => (
      <div className='Host__App'>
        <div className='Host__AppApex'>{app.apdex}</div>
        <div className='Host__AppName'>{app.name}</div>
      </div>
    ))
  }
}
