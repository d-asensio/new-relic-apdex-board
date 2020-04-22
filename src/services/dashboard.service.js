import { Dashboard, Application, Host } from '../models'

const API_URL = 'data/host-app-data.json'

export class DashboardService {
  constructor () {
    this._dashboard = new Dashboard({
      user: 'this.email.is.so.long@newrelic.com'
    })
  }

  get dashboard () { return this._dashboard }

  async init () {
    const appRecords = await this._fetchAppRecordsFromApi()

    const sortedRecords = this._sortAppRecordsByApdex(appRecords)
    this._createAppModelsFromRecords(sortedRecords)
  }

  addAppToHosts (app, hosts) {
    for (const hostId of hosts) {
      const host = this._getOrCreateHostById(hostId)
      host.addApp(app)
    }
  }

  getTopAppsByHost (hostId) {
    this._hostExistsOrThrow(hostId)

    const host = this._getHostById(hostId)

    return host.getTopApps(25)
  }

  getAppById (appId) {
    return this._dashboard.getApp(appId)
  }

  async _fetchAppRecordsFromApi () {
    const res = await fetch(API_URL)
    return res.json()
  }

  _sortAppRecordsByApdex (appRecords) {
    return appRecords.sort(Application.byApdexInDescOrder)
  }

  _createAppModelsFromRecords (appRecords) {
    for (const { host, ...appData } of appRecords) {
      const app = new Application(appData)

      this.addAppToHosts(app, host)
      this._dashboard.addApp(app)
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
    return this._dashboard.getHost(hostId)
  }

  _createHost (hostId) {
    const host = new Host({ id: hostId })

    this._dashboard.addHost(host)

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
    return this._dashboard.hasHost(hostId)
  }
}
