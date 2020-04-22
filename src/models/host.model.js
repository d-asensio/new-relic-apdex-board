export class Host {
  constructor ({ id }) {
    this.id = id
    this._apps = []
  }

  addApp (app) {
    this._insertAppInPosition(app)
  }

  removeApp (app) {
    this._removeAppFromPosition(app)
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

  _removeAppFromPosition (app) {
    const appIndex = this._findAppIndexById(app.id)

    this._indexExistOrThrow(appIndex)
    this._removeAppAtIndex(appIndex)
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

    return nextAppIndex
  }

  _findAppIndexById (appId) {
    const appIndex = this._apps.findIndex(
      comparee => comparee.id === appId
    )

    return appIndex
  }

  _insertAppAtIndex (app, insertionIndex) {
    this._apps.splice(insertionIndex, 0, app)
  }

  _removeAppAtIndex (deletionIndex) {
    this._apps.splice(deletionIndex, 1)
  }

  _indexExistOrThrow (index) {
    if (!this._indexExists(index)) {
      throw new Error(
        'The specified app do not exist in the host.'
      )
    }
  }

  _indexExists (index) {
    return index >= 0 && index < this._apps.length
  }
}
