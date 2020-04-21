import { enableFetchMocks } from 'jest-fetch-mock'
import mockData from '../data/host-app-data.json'

import { DashboardService } from '../src/services'

enableFetchMocks()

const largeResponseMock = JSON.stringify(mockData)
const smallResponseMock = JSON.stringify(mockData.slice(0, 2))

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
})
