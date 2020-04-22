import { uniqueId } from '../utils'

export class Application {
  constructor ({ name, apdex, version, contributors }) {
    this._id = uniqueId('app_')

    this._name = name
    this._apdex = apdex
    this._version = version
    this._contributors = contributors
  }

  get id () { return this._id }
  get name () { return this._name }
  get apdex () { return this._apdex }
  get version () { return this._version }
  get contributors () { return this._contributors }

  compareTo (comparee) {
    return this.apdex - comparee.apdex
  }

  static byApdexInDescOrder (appA, appB) {
    return appB.apdex - appA.apdex
  }
}
