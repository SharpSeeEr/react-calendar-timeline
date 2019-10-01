import React from 'react'
import PropTypes from 'prop-types'

function SidebarHeader({ children, width }) {

  return (
    <div
      className="rct-header-side"
      style={{ width }}
    >
      {children}
    </div>
  )
}

SidebarHeader.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
}

export default SidebarHeader
