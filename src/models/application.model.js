export class Application {
  constructor ({ name, apdex, version, host, contributors }) {
    this.name = name
    this.apdex = apdex
    this.version = version
    this.contributors = contributors
    this.host = host
  }

  compareTo (comparee) {
    return this.apdex - comparee.apdex
  }

  static byApdexInDescOrder (appA, appB) {
    return appB.compareTo(appA)
  }
}
