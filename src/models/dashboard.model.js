export class Dashboard {
  constructor ({ user }) {
    this.user = user

    this._hosts = new Map()
    this._apps = new Map()
  }

  addApp (app) {
    this._apps.set(app.id, app)
  }

  hasApp (appId) {
    return this._apps.has(appId)
  }

  getApp (appId) {
    return this._apps.get(appId)
  }

  addHost (host) {
    this._hosts.set(host.id, host)
  }

  hasHost (hostId) {
    return this._hosts.has(hostId)
  }

  getHost (hostId) {
    return this._hosts.get(hostId)
  }

  getAllHosts () {
    return Array.from(this._hosts.values())
  }
}
