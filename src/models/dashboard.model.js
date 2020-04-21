export class Dashboard {
  constructor ({ user }) {
    this.user = user
    this.hosts = new Map()
    this.apps = []
  }
}
