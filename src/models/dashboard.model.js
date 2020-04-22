export class Dashboard {
  constructor ({ user }) {
    this._user = user

    this._hosts = new Map()
    this._apps = new Map()
  }

  get user () { return this._user }

  addApp (app) {
    this._apps.set(app.id, app)
  }

  hasAppId (appId) {
    return this._apps.has(appId)
  }

  getAppById (appId) {
    return this._apps.get(appId)
  }

  addHost (host) {
    this._hosts.set(host.id, host)
  }

  hasHostId (hostId) {
    return this._hosts.has(hostId)
  }

  getHostById (hostId) {
    return this._hosts.get(hostId)
  }

  getAllHosts () {
    return Array.from(this._hosts.values())
  }
}
