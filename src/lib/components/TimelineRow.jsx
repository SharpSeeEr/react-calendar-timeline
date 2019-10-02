import React from 'react'
import PropTypes from 'prop-types'
import GridModel from '../providers/GridModel'
import { useCanvasState } from '../providers'
import Sidebar from './Sidebar'

function createSidebar(width, position, model) {
  if (width > 0) {
    const titleKey = position === 'left' ? 'title' : 'rightTitle'
    const text = model ? <span>{model[titleKey]}</span> : <span>&nbsp;</span>
    return (
      <Sidebar width={width} position={position}>
        {text}
      </Sidebar>
    )
  }
  return undefined
}

function TimelineRow({
  children,
  className,
  model
}) {

  const classNames = `rct-row ${className}`.trim()
  const { leftSidebarWidth, rightSidebarWidth } = useCanvasState()

  const leftSidebar = createSidebar(leftSidebarWidth, 'left', model)
  const rightSidebar = createSidebar(rightSidebarWidth, 'right', model)

  return (
    <div
      className={classNames}
      data-testid="TimelineRow"
    >
      {leftSidebar}
      {children}
      {rightSidebar}
    </div>
  )
}

TimelineRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  model: PropTypes.instanceOf(GridModel),
}

TimelineRow.defaultProps = {
  children: <span>&nbsp;</span>,
  className: undefined,
  model: undefined,
}


export default TimelineRow
