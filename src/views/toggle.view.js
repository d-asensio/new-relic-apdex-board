/** @jsx jsx */
import jsx from '../jsx-runtime'

import { EventBus } from '../utils'

export class ToggleView {
  constructor () {
    this._eventBus = new EventBus()

    this._rootElement = null
    this._inputElement = null
    this._labelTextNode = document.createTextNode('')
  }

  create () {
    this._rootElement = (
      <label className='Toggle'>
        {this._createInputElement()}
        <span className='Toggle__Mark' />
        {this._labelTextNode}
      </label>
    )

    return this._rootElement
  }

  onToggle (handler) {
    this._eventBus.on('toggle', handler)
  }

  setLabelText (newLabelText) {
    this._labelTextNode.nodeValue = newLabelText
  }

  _createInputElement () {
    this._inputElement = <input type='checkbox' />
    this._attachInputEvents()

    return this._inputElement
  }

  _attachInputEvents () {
    this._inputElement.addEventListener(
      'change',
      this._handleInputEvent.bind(this)
    )
  }

  _handleInputEvent (event) {
    this._eventBus.emit(
      'toggle',
      { isActive: event.target.checked }
    )
  }
}
