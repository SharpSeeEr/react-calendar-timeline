import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Sidebar({
  children,
  width,
  position,
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
}

Sidebar.defaultProps = {
  children: undefined,
  position: 'left',
}

export default Sidebar
