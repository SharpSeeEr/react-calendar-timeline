import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import GridItem from '../providers/GridItem'

function Sidebar({
  children,
  width,
  position,
  model,
}) {

  const classNames = classnames('rct-sidebar', position)

  return (
    <div
      className={classNames}
      style={{ width }}
    >
      {children}
    </div>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  position: PropTypes.oneOf('left', 'right'),
  model: PropTypes.instanceOf(GridItem),
}

Sidebar.defaultProps = {
  children: undefined,
  position: 'left',
  model: undefined,
}

export default Sidebar
