import React from 'react'
import PropTypes from 'prop-types'

import { useCanvasState } from '../providers'

function TimelineCell({ children, className }) {

  const { zoomLevel } = useCanvasState()

  const classNames = `rct-row-cell zoom-${zoomLevel} ${className}`.trim()

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}

TimelineCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

TimelineCell.defaultProps = {
  children: <span>&nbsp;</span>,
  className: undefined,
}


export default TimelineCell
