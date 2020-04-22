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
    this._hostIdExistsOrThrow(hostId)

    const host = this._getHostById(hostId)

    return host.getTopApps(25)
  }

  getAppById (appId) {
    return this._dashboard.getAppById(appId)
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
    if (!this._hostIdExists(hostId)) {
      return this._createHostById(hostId)
    }

    const host = this._getHostById(hostId)

    return host
  }

  _getHostById (hostId) {
    return this._dashboard.getHostById(hostId)
  }

  _createHostById (hostId) {
    const host = new Host({ id: hostId })

    this._dashboard.addHost(host)

    return host
  }

  _hostIdExistsOrThrow (hostId) {
    if (!this._hostIdExists(hostId)) {
      throw new Error(
        `The host identified by "${hostId} do not exist."`
      )
    }
  }

  _hostIdExists (hostId) {
    return this._dashboard.hasHostId(hostId)
  }
}
