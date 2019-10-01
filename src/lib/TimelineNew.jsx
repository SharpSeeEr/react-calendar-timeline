import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  TimelineProvider,
  TimelineDataProvider,
  CanvasProvider,
  EventsProvider
} from './timeline'
import { ConfigPropTypes } from './default-config'

function TimelineNew({
  children,
  defaultZoom,
  defaultTimeStart,
  defaultTimeEnd,

  groups,
  items,
  selected,

  config,
  layout,
  design,

  onItemMove,
  onItemResize,
  onItemClick,
  onItemSelect,
  onItemDeselect,
  onItemDrag,
  onItemDoubleClick,
  onItemContextMenu,

  onCanvasClick,
  onCanvasDoubleClick,
  onCanvasContextMenu,
  onZoom,

  onTimeChange,
  onBoundsChange,
}) {

  const events = {
    onItemMove,
    onItemResize,
    onItemClick,
    onItemSelect,
    onItemDeselect,
    onItemDrag,
    onItemDoubleClick,
    onItemContextMenu,

    onCanvasClick,
    onCanvasDoubleClick,
    onCanvasContextMenu,
    onZoom,

    onTimeChange,
    onBoundsChange,
  }

  const itemCount = 75
  const zoomLevel = 0
  const rowItemClassName = `rct-row-item zoom-${zoomLevel}`

  const getHourHeaders = () => {
    const items = [];
    for (let i = 0; i < 24; i++) {
      items.push(<div key={i} className={rowItemClassName}>{moment({hour: i, minute: 0}).format("HH:mm")}</div>)
    }
    return items;
  }

  const getHeaderGroup = (date) => (
    <div className="rct-header-group">
      <div className="rct-row-item rct-header-primary">
        <span>{date.format('dddd, LL')}</span>
      </div>
      <div className="rct-row rct-header-secondary">
        {getHourHeaders()}
      </div>
    </div>
  )

  const getBodyItems = () => {
    const items = [];
    for (let i = 0; i < 75; i++) {
      items.push(<div className={rowItemClassName}>&nbsp;</div>)
    }
    return items;
  }
  const bodyRows = groups.map(group => (
    <div key={group[config.keys['groupIdKey']]} className="rct-row">
      <div className="rct-sidebar left">
        <div>
          {group[config.keys['groupIdKey']]}
        </div>
      </div>
      {getBodyItems()}
    </div>
  ))

  return (
    <div className="react-calendar-timeline">
      <div className="rct-canvas">
        <div className="rct-row rct-header rct-sticky">
          <div className="rct-sidebar left">Sidebar Header</div>
          <div className="rct-header-timeline">
            {getHeaderGroup(moment('2019/09/30'))}
            {getHeaderGroup(moment('2019/10/01'))}
            {getHeaderGroup(moment('2019/10/02'))}
          </div>
        </div>
        {bodyRows}
      </div>
      {/* // <TimelineProvider {...config}>
      //   <TimelineDataProvider groups={groups} items={items}>
      //     <EventsProvider {...events}>
      //       <CanvasProvider zoomLevel={defaultZoom} defaultTimeStart={defaultTimeStart}>

      //       </CanvasProvider>
      //     </EventsProvider>
      //   </TimelineDataProvider>
      // </TimelineProvider> */}
    </div>
  )
}

TimelineNew.propTypes = {
  children: PropTypes.node,

  defaultZoom: PropTypes.number,
  defaultTimeStart: PropTypes.object,
  defaultTimeEnd: PropTypes.object,

  groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  selected: PropTypes.array,

  config: ConfigPropTypes.config,
  layout: ConfigPropTypes.layout,
  design: ConfigPropTypes.design,

  onItemMove: PropTypes.func,
  onItemResize: PropTypes.func,
  onItemClick: PropTypes.func,
  onItemSelect: PropTypes.func,
  onItemDeselect: PropTypes.func,
  onItemDrag: PropTypes.func,
  onItemDoubleClick: PropTypes.func,
  onItemContextMenu: PropTypes.func,

  onCanvasClick: PropTypes.func,
  onCanvasDoubleClick: PropTypes.func,
  onCanvasContextMenu: PropTypes.func,
  onZoom: PropTypes.func,

  onTimeChange: PropTypes.func,
  onBoundsChange: PropTypes.func,
}

export default TimelineNew
