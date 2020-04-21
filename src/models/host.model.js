export class Host {
  constructor ({ id }) {
    this.id = id
    this._apps = []
  }

  addApp (app) {
    this._insertAppInPosition(app)
  }

  getTopApps (nTopApps) {
    return this._apps.slice(0, nTopApps)
  }

  _insertAppInPosition (app) {
    if (this._isSmallestApp(app)) {
      this._apps.push(app)
    } else {
      const appInsertionIndex = this._findAppInsertionIndex(app)

      this._insertAppAtIndex(app, appInsertionIndex)
    }
  }

  _isSmallestApp (app) {
    if (this._isEmpty()) {
      return true
    }

    const lastApp = this._getLastApp()
    return app.compareTo(lastApp) <= 0
  }

  _isEmpty () {
    return this._apps.length === 0
  }

  _getLastApp () {
    return this._apps[this._apps.length - 1]
  }

  _findAppInsertionIndex (app) {
    const nextAppIndex = this._apps.findIndex(
      comparee => app.compareTo(comparee) >= 0
    )

    return nextAppIndex - 1
  }

  _insertAppAtIndex (app, insertionIndex) {
    this._apps.splice(insertionIndex, 0, app)
  }
}
