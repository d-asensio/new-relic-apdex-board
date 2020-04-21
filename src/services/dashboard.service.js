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
    this._hostExistsOrThrow(hostId)

    const host = this._getHostById(hostId)

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
    if (!this._hostExists(hostId)) {
      return this._createHost(hostId)
    }

    const host = this._getHostById(hostId)

    return host
  }

  _getHostById (hostId) {
    return this._dashboard.hosts.get(hostId)
  }

  _createHost (hostId) {
    const host = new Host({ id: hostId })
    this._dashboard.hosts.set(host.id, host)

    return host
  }

  _hostExistsOrThrow (hostId) {
    if (!this._hostExists(hostId)) {
      throw new Error(
        `The host identified by "${hostId} do not exist."`
      )
    }
  }

  _hostExists (hostId) {
    return this._dashboard.hosts.has(hostId)
  }
}
