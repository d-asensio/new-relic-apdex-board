import { enableFetchMocks } from 'jest-fetch-mock'
import mockData from '../data/host-app-data.json'

import { DashboardService } from '../src/services'
import { Dashboard, Application } from '../src/models'

enableFetchMocks()

const largeResponseMock = JSON.stringify(mockData.slice(0, 100))
const smallResponseMock = JSON.stringify(mockData.slice(0, 10))

describe('Dashboard service', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('is constructed', () => {
    const dashboardService = new DashboardService()

    expect(dashboardService).toBeInstanceOf(DashboardService)
  })

  it('fetches data from the API when it is initialized', async () => {
    fetch.mockResponseOnce(largeResponseMock)

    const dashboardService = new DashboardService()
    await dashboardService.init()

    expect(fetch.mock.calls.length).toEqual(1)
  })

  it('throws an error when trying to get the top apps of a unexisting host', () => {
    const dashboardService = new DashboardService()

    expect(() => {
      dashboardService.getTopAppsByHost('unexisting.host.com')
    }).toThrowErrorMatchingSnapshot()
  })

  it('returns all the apps if there are less than 25 for a specified host', async () => {
    fetch.mockResponseOnce(smallResponseMock)

    const dashboardService = new DashboardService()
    await dashboardService.init()

    const topApps = dashboardService.getTopAppsByHost('7e6272f7-098e.dakota.biz')

    expect(topApps.length).toEqual(2)
  })

  it('returns only 25 apps for a specified host', async () => {
    fetch.mockResponseOnce(largeResponseMock)

    const dashboardService = new DashboardService()
    await dashboardService.init()

    const topApps = dashboardService.getTopAppsByHost('7e6272f7-098e.dakota.biz')

    expect(topApps.length).toEqual(25)
  })

  it('returns an app by id', async () => {
    fetch.mockResponseOnce(smallResponseMock)

    const dashboardService = new DashboardService()
    await dashboardService.init()

    const [appA] = dashboardService.getTopAppsByHost('7e6272f7-098e.dakota.biz')
    const gotApp = dashboardService.getAppById(appA.id)

    expect(gotApp).toBe(appA)
  })

  it('has dashboard instance', () => {
    const dashboardService = new DashboardService()

    expect(dashboardService.dashboard).toBeInstanceOf(Dashboard)
  })

  it('the dashboard instance is not modificable', () => {
    const dashboardService = new DashboardService()

    expect(() => {
      dashboardService.dashboard = new Dashboard({
        user: 'some.user@newrelic.com'
      })
    }).toThrowError()
  })

  it('adds an app to a new host', async () => {
    fetch.mockResponseOnce(JSON.stringify([
      {
        name: 'A',
        contributors: [],
        version: 7,
        apdex: 68,
        host: [
          'first.host.com'
        ]
      },
      {
        name: 'B',
        contributors: [],
        version: 7,
        apdex: 30,
        host: [
          'first.host.com'
        ]
      }
    ]))

    const dashboardService = new DashboardService()
    await dashboardService.init()

    const [appA] = dashboardService.getTopAppsByHost('first.host.com')

    dashboardService.addAppToHosts(appA, [
      'second.host.com'
    ])

    const [appASecond] = dashboardService.getTopAppsByHost('second.host.com')

    expect(appASecond).toBe(appA)
  })

  it('removes an app from a host', async () => {
    fetch.mockResponseOnce(JSON.stringify([
      {
        name: 'A',
        contributors: [],
        version: 7,
        apdex: 68,
        host: [
          'first.host.com'
        ]
      },
      {
        name: 'B',
        contributors: [],
        version: 7,
        apdex: 30,
        host: [
          'first.host.com'
        ]
      }
    ]))

    const dashboardService = new DashboardService()
    await dashboardService.init()

    const [appA, appB] = dashboardService.getTopAppsByHost('first.host.com')

    dashboardService.removeAppFromHosts(appA, [
      'first.host.com'
    ])

    const [appBFirst] = dashboardService.getTopAppsByHost('first.host.com')

    expect(appBFirst).toBe(appB)
  })

  it('attempts to add an app that do not exist', async () => {
    fetch.mockResponseOnce('[]')

    const dashboardService = new DashboardService()
    await dashboardService.init()

    const unexistingApp = new Application({
      name: 'A',
      apdex: 33,
      version: 7,
      contributors: []
    })

    expect(() => {
      dashboardService.addAppFromHosts(unexistingApp, [
        'first.host.com'
      ])
    }).toThrowErrorMatchingSnapshot()
  })

  it('attempts to remove an app that do not exist', async () => {
    fetch.mockResponseOnce('[]')

    const dashboardService = new DashboardService()
    await dashboardService.init()

    const unexistingApp = new Application({
      name: 'A',
      apdex: 33,
      version: 7,
      contributors: []
    })

    expect(() => {
      dashboardService.removeAppFromHosts(unexistingApp, [
        'first.host.com'
      ])
    }).toThrowErrorMatchingSnapshot()
  })

  it('continues returning 25 top apps after removing', async () => {
    fetch.mockResponseOnce(largeResponseMock)

    const dashboardService = new DashboardService()
    await dashboardService.init()

    const [highestApexApp] = dashboardService.getTopAppsByHost('7e6272f7-098e.dakota.biz')

    dashboardService.removeAppFromHosts(highestApexApp, [
      '7e6272f7-098e.dakota.biz'
    ])

    const topApps = dashboardService.getTopAppsByHost('7e6272f7-098e.dakota.biz')

    expect(topApps.length).toEqual(25)
  })
})
