import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'
import Sidebar from '../Sidebar'
import { useCanvasState } from '../../providers/CanvasProvider'
import { useTimelineState } from '../../providers'
import HeaderGroup from './HeaderGroup'
import TimelineRow from '../TimelineRow'


function TimelineHeader() {

  const { leftSidebarWidth, rightSidebarWidth } = useCanvasState()
  const { stickyHeader } = useTimelineState()

  const leftSidebarHeader = leftSidebarWidth > 0 ? <Sidebar width={leftSidebarWidth} position="left" /> : undefined
  const rightSidebarHeader = rightSidebarWidth > 0 ? <Sidebar width={rightSidebarWidth} position="right" /> : undefined

  const classNameList = classnames('rct-row rct-header', stickyHeader ? 'rct-sticky' : '')

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

export default TimelineHeader
