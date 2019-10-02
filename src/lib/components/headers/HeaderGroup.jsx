import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'

import { useCanvasState } from '../../providers'

function HeaderGroup({ date }) {

  const { zoomLevel } = useCanvasState()

  const rowItemClassName = `rct-row-item zoom-${zoomLevel}`

  const getHourHeaders = () => {
    const items = [];
    for (let i = 0; i < 24; i++) {
      items.push(<div key={i} className={rowItemClassName}>{moment({hour: i, minute: 0}).format("HH:mm")}</div>)
    }
    return items;
  }

  return (
    <div className="rct-header-group">
      <div className="rct-row-item rct-header-primary">
        <span>{date.format('dddd, LL')}</span>
      </div>
      <div className="rct-row rct-header-secondary">
        {getHourHeaders()}
      </div>
    </div>
  )
}

export default HeaderGroup
