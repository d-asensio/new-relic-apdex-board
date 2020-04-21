import { Dashboard, Application, Host } from '../models'

const API_URL = 'data/host-app-data.json'

export class DashboardService {
  constructor () {
    this._dashboard = new Dashboard({
      user: 'this.email.is.so.long@newrelic.com'
    })
  }

  async init () {
    const appRecords = await this._fetchAppRecordsFromApi()

    this._createAppModelsFromRecords(appRecords)
    this._sortAppsByApdex()
    this._linkHostsWithApps()
  }

  getTopAppsByHost (hostId) {
    const host = this._getHostById(hostId)

    if (host === null) {
      this._throwHostNotExists(hostId)
    }

    return host.getTopApps(25)
  }

  async _fetchAppRecordsFromApi () {
    const res = await fetch(API_URL)
    return res.json()
  }

  _createAppModelsFromRecords (appRecords) {
    this._dashboard.apps = appRecords.map(
      appRecord => new Application(appRecord)
    )
  }

  _sortAppsByApdex () {
    this._dashboard.apps.sort(Application.byApdexInDescOrder)
  }

  _linkHostsWithApps () {
    for (const app of this._dashboard.apps) {
      for (const hostId of app.host) {
        const host = this._getOrCreateHostById(hostId)

        host.addApp(app)
      }
    }
  }

  _getOrCreateHostById (hostId) {
    const host = this._getHostById(hostId)

    if (host === null) {
      return this._createHost(hostId)
    }

    return host
  }

  _getHostById (hostId) {
    return this._dashboard.hosts.get(hostId) || null
  }

  _createHost (hostId) {
    const host = new Host({ id: hostId })
    this._dashboard.hosts.set(host.id, host)

    return host
  }

  _throwHostNotExists (unexistingId) {
    throw new Error(
      `The host identified by "${unexistingId} do not exist."`
    )
  }
}
