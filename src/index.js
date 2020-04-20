/* global fetch */

import './styles/index.scss'

;(async () => {
  const res = await fetch('data/host-app-data.json')
  const appRecords = await res.json()

  console.log(appRecords)
})()

window.onload = () => {
  console.log('Hello world')
}
