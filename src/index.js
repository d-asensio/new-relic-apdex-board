/* global fetch */

import './styles/index.scss'

;(async () => {
  const res = await fetch('data/host-app-data.json')
  const appRecords = await res.json()

  console.log(appRecords)
})()

window.onload = () => {
  const dashboardElement = document.querySelector('.Dashboard')
  const toggleElement = document.querySelector('.Toggle > input')

  toggleElement.addEventListener('change', () => {
    const isInListLayout = dashboardElement.classList.contains('Dashboard--listLayout')

    if (isInListLayout) {
      dashboardElement.classList.remove('Dashboard--listLayout')
    } else {
      dashboardElement.classList.add('Dashboard--listLayout')
    }
  })
}
