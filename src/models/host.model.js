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
    const appInsertionIndex = this._binarySearch(app)
    this._insertAppAtIndex(app, appInsertionIndex)
  }

  _removeAppFromPosition (app) {
    const appIndex = this._binarySearch(app)

    this._indexExistOrThrow(appIndex)
    this._removeAppAtIndex(appIndex)
  }

  _binarySearch (app) {
    let startIndex = 0
    let endIndex = this._apps.length - 1
    let currentIndex

    while (startIndex <= endIndex) {
      currentIndex = (startIndex + endIndex) / 2 | 0
      const iteratingApp = this._apps[currentIndex]

      if (app.compareTo(iteratingApp) < 0) {
        startIndex = currentIndex + 1
      } else if (app.compareTo(iteratingApp) > 0) {
        endIndex = currentIndex - 1
      } else {
        return currentIndex
      }
    }

    return Math.abs(~endIndex)
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
