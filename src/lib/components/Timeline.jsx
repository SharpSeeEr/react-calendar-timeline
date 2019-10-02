import React from 'react'
import PropTypes from 'prop-types'
// import { useTimelineState } from '../providers'

function Timeline({ children }) {

  // const config = useTimelineState()

  return (
    <div className="rct-timeline">
      {children}
    </div>
  )
}

Timeline.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Timeline
