import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'
import { useTimelineState, useCanvasState, useTimelineDataState } from '../providers'
import TimelineRow from '../TimelineRow'
import Sidebar from './Sidebar'


function TimelineBody() {

  const stateData = useTimelineDataState()
  const { stickyHeader } = useTimelineState()

  const classNameList = classnames('rct-row rct-header', stickyHeader ? 'rct-sticky' : '')

  const getBodyItems = () => {
    const bodyItems = []
    for (let i = 0; i < itemCount; i++) {
      bodyItems.push(<div key={i} className={rowItemClassName}>&nbsp;</div>)
    }
    return bodyItems
  }
  const rows = stateData.models.map(model => (
    <TimelineRow key={model.id} model={model}>

      {getBodyItems()}
    </TimelineRow>
  ))

  // Can div rct-header-timeline be converted to use TimelineRow?
  return (
    <TimelineRow className={classNameList}>
      {leftSidebarHeader}
      <div className="rct-header-timeline">
        <HeaderGroup date={moment({ year: 2019, month: 8, day: 30 })} />
        <HeaderGroup date={moment({ year: 2019, month: 9, day: 1 })} />
        <HeaderGroup date={moment({ year: 2019, month: 9, day: 2 })} />
      </div>
      {rightSidebarHeader}
    </TimelineRow>
  )
}

// TimelineHeader.propTypes = {
//   children: PropTypes.node,
// }

// TimelineHeader.defaultProps = {
//   children: undefined
// }

export default TimelineBody
