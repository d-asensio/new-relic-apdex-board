import { enableFetchMocks } from 'jest-fetch-mock'

import { DashboardController } from '../src/controllers'
import { DashboardService } from '../src/services'
import { DashboardView } from '../src/views'

import mockData from '../data/host-app-data.json'

enableFetchMocks()

const smallResponseMock = JSON.stringify(mockData.slice(0, 2))

describe('Dashboard controller', () => {
  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(smallResponseMock)
  })

  it('is constructed', () => {
    const dashboardController = new DashboardController(
      new DashboardService(),
      new DashboardView()
    )

    expect(dashboardController).toBeInstanceOf(DashboardController)
  })

  it('is initialized', async () => {
    const dashboardController = new DashboardController(
      new DashboardService(),
      new DashboardView()
    )

    await dashboardController.init()

    expect(dashboardController.isInitialized()).toBe(true)
  })

  it('is not initialized', () => {
    const dashboardController = new DashboardController(
      new DashboardService(),
      new DashboardView()
    )

    expect(dashboardController.isInitialized()).toBe(false)
  })

  it('is rendered to a DOM element', async () => {
    const dashboardController = new DashboardController(
      new DashboardService(),
      new DashboardView()
    )

    await dashboardController.init()

    const element = document.createElement('div')

    dashboardController.renderToDom(element)
    const dashboardElement = element.querySelector('.Dashboard')

    expect(dashboardElement).toBeInstanceOf(HTMLElement)
  })

  it('throws an error when attempting to render before initializing', () => {
    const dashboardController = new DashboardController(
      new DashboardService(),
      new DashboardView()
    )

    const element = document.createElement('div')

    expect(() => {
      dashboardController.renderToDom(element)
    }).toThrowErrorMatchingSnapshot()
  })

  it('throws an error when attempting to render to a invalid dom node', async () => {
    const dashboardController = new DashboardController(
      new DashboardService(),
      new DashboardView()
    )

    await dashboardController.init()

    expect(() => {
      dashboardController.renderToDom('.Class')
    }).toThrowErrorMatchingSnapshot()
  })

  it('toggles the layout to list', async () => {
    const dashboardController = new DashboardController(
      new DashboardService(),
      new DashboardView()
    )

    await dashboardController.init()

    const element = document.createElement('div')

    dashboardController.renderToDom(element)

    const toggleElement = element.querySelector('.Toggle')
    toggleElement.click()

    const dashboardElement = element.querySelector('.Dashboard')

    expect(
      dashboardElement.classList.contains('Dashboard--listLayout')
    ).toBe(true)
  })

  it('toggles the layout back to grid', async () => {
    const dashboardController = new DashboardController(
      new DashboardService(),
      new DashboardView()
    )

    await dashboardController.init()

    const element = document.createElement('div')

    dashboardController.renderToDom(element)

    const toggleElement = element.querySelector('.Toggle')
    toggleElement.click()
    toggleElement.click()

    const dashboardElement = element.querySelector('.Dashboard')

    expect(
      dashboardElement.classList.contains('Dashboard--listLayout')
    ).toBe(false)
  })

  it('alerts when clicking an app', async () => {
    const dashboardController = new DashboardController(
      new DashboardService(),
      new DashboardView()
    )

    await dashboardController.init()

    const element = document.createElement('div')

    dashboardController.renderToDom(element)

    const appElement = element.querySelector('.Host__App')

    jest.spyOn(window, 'alert').mockImplementation(alertText => {
      expect(alertText).toMatchSnapshot()
    })

    appElement.click()
  })
})
