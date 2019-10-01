import './styles.scss'
import '../../src/lib/Timeline.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { HashRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import DemoLite from './demo-lite'

// const demos = {
//   main: require('./demo-main').default,
//   lite: require('./demo-lite').default,
//   performance: require('./demo-performance').default,
//   treeGroups: require('./demo-tree-groups').default,
//   linkedTimelines: require('./demo-linked-timelines').default,
//   elementResize: require('./demo-element-resize').default,
//   renderers: require('./demo-renderers').default,
//   verticalClasses: require('./demo-vertical-classes').default,
//   customItems: require('./demo-custom-items').default,
//   customHeaders: require('./demo-headers').default,
//   customInfoLabel: require('./demo-custom-info-label').default,
//   controledSelect: require('./demo-controlled-select').default
// }

// A simple component that shows the pathname of the current location
class Menu extends Component {
  // static propTypes = {
  //   location: PropTypes.object.isRequired
  // }

  render() {
    // let pathname = (this.props.location || {}).pathname

    // if (!pathname || pathname === '/') {
    //   pathname = `/${Object.keys(demos)[0]}`
    // }

    return (
      <div
        className="demo-row">
        Choose the demo:
        {/* {Object.keys(demos).map(key => (
          <Link
            key={key}
            className={pathname === `/${key}` ? 'selected' : ''}
            to={`/${key}`}
          >
            {key}
          </Link>
        ))} */}
      </div>
    )
  }
}

const MenuWithRouter = withRouter(Menu)

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <MenuWithRouter style={{ flexGrow: 0 }} />
          <DemoLite />
          {/* <div className="demo-demo">
            <Route path="/" exact component={demos[Object.keys(demos)[0]]} />
            {Object.keys(demos).map(key => (
              <Route key={key} path={`/${key}`} component={demos[key]} />
            ))}
          </div> */}
        </div>
      </Router>
    )
  }
}

export default App
