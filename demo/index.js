import React from 'react'
import ReactDOM from 'react-dom'
import 'react-calendar-timeline-css'
import App from './app'
import './app/demo-lite/Timeline.scss'

const render = AppToRender => {
  ReactDOM.render(<AppToRender />, document.getElementById('root'))
}

render(App)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default

    render(NextApp)
  })
}
