import { uniqueId } from '../utils'

export class Application {
  constructor ({ name, apdex, version, contributors }) {
    this.id = uniqueId('app_')

    this.name = name
    this.apdex = apdex
    this.version = version
    this.contributors = contributors
  }

  compareTo (comparee) {
    return this.apdex - comparee.apdex
  }

  static byApdexInDescOrder (appA, appB) {
    return appB.apdex - appA.apdex
  }
}
