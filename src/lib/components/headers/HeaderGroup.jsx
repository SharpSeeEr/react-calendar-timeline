import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import TimelineCell from '../TimelineCell'

function HeaderGroup({ date }) {

  const getHourHeaders = () => {
    const items = []
    for (let i = 0; i < 24; i++) {
      items.push(<TimelineCell key={i}>{moment({hour: i, minute: 0}).format("HH:mm")}</TimelineCell>)
    }
    return items
  }

  return (
    <div className="rct-header-group">
      <TimelineCell className="rct-header-primary">
        <span>{date.format('dddd, LL')}</span>
      </TimelineCell>
      <div className="rct-row rct-header-secondary">
        {getHourHeaders()}
      </div>
    </div>
  )
}

HeaderGroup.propTypes = {
  date: PropTypes.shape({ format: PropTypes.func }).isRequired,
}

export default HeaderGroup
