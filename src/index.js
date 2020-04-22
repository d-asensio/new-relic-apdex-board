
import './styles/index.scss'

import { DashboardController } from './controllers'
import { DashboardService } from './services'
import { DashboardView } from './views'

const controller = new DashboardController(
  new DashboardService(),
  new DashboardView()
)

function renderApp () {
  const appRoot = document.getElementById('app')
  controller.renderToDom(appRoot)
}

;(async function IIFE () {
  await controller.init()

  if (document.readyState === 'complete') {
    renderApp()
  } else {
    document.addEventListener(
      'DOMContentLoaded',
      () => renderApp()
    )
  }
})()
