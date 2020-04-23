
/**
 * Mediates between the user input, the data and the view.
 */
export class DashboardController {
  constructor (service, view) {
    this._isInitialized = false

    this._service = service
    this._view = view

    this._attachViewListeners()
  }

  async init () {
    await this._service.init()
    this._isInitialized = true
  }

  isInitialized () {
    return this._isInitialized
  }

  renderToDom (element) {
    this._isInitializedOrThrow()
    this._isValidElementOrThrow(element)

    const viewElement = this._getViewElement()
    element.append(viewElement)
  }

  _getViewElement () {
    return this._view.create(
      this._service.dashboard
    )
  }

  _attachViewListeners () {
    this._view.onClickApp(
      this._handleClickApp.bind(this)
    )

    this._view.onToggleLayout(
      this._handleLayoutToggle.bind(this)
    )
  }

  _handleClickApp ({ appId }) {
    const clickedApp = this._service.getAppById(appId)

    alert(`Release number: ${clickedApp.version}`)
  }

  _handleLayoutToggle ({ isActive }) {
    if (isActive) {
      this._view.setLayoutToList()
    } else {
      this._view.setLayoutToGrid()
    }
  }

  _isValidElementOrThrow (element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError(
        'The provided element is not valid.'
      )
    }
  }

  _isInitializedOrThrow () {
    if (!this.isInitialized()) {
      throw new Error(
        'The controller is not yet initialized. You should call to the "init ()" asynchronous method and await for it' +
        'to finis before proceeding.'
      )
    }
  }
}
