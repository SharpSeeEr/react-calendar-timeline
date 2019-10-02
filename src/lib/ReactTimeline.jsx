import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  TimelineProvider,
  TimelineDataProvider,
  CanvasProvider,
  EventsProvider
} from './providers'
import { Canvas, Timeline } from './components'
import { ConfigPropTypes } from './default-config'

function ReactTimeline({
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
  events,
  // onItemMove,
  // onItemResize,
  // onItemClick,
  // onItemSelect,
  // onItemDeselect,
  // onItemDrag,
  // onItemDoubleClick,
  // onItemContextMenu,

  // onCanvasClick,
  // onCanvasDoubleClick,
  // onCanvasContextMenu,
  // onZoom,

  // onTimeChange,
  // onBoundsChange,
}) {
  const itemCount = 72
  const zoomLevel = 0
  const rowItemClassName = `rct-row-item zoom-${zoomLevel}`

  const getHourHeaders = () => {
    const headers = []
    for (let i = 0; i < 24; i++) {
      headers.push(<div key={i} className={rowItemClassName}>{moment({hour: i, minute: 0}).format("HH:mm")}</div>)
    }
    return headers
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
    const bodyItems = []
    for (let i = 0; i < itemCount; i++) {
      bodyItems.push(<div key={i} className={rowItemClassName}>&nbsp;</div>)
    }
    return bodyItems
  }
  const bodyRows = groups.map(group => (
    <div key={group[config.keys.groupIdKey]} className="rct-row">
      <div className="rct-sidebar left">
        <div>
          {group[config.keys.groupIdKey]}
        </div>
      </div>
      {getBodyItems()}
    </div>
  ))

  return (
    <div className="react-calendar-timeline">
      <TimelineProvider config={config}>
        <TimelineDataProvider groups={groups} items={items}>
          <CanvasProvider layout={layout} defaultTimeStart={defaultTimeStart} defaultZoom={defaultZoom}>
            <EventsProvider events={events}>
              <Canvas>
                <Timeline />
                {/* <div className="rct-timeline">
                  <div className="rct-row rct-header rct-sticky">
                    <div className="rct-sidebar left">Sidebar Header</div>
                    <div className="rct-header-timeline">
                      {getHeaderGroup(moment({ year: 2019, month: 8, day: 30 }))}
                      {getHeaderGroup(moment({ year: 2019, month: 9, day: 1 }))}
                      {getHeaderGroup(moment({ year: 2019, month: 9, day: 2 }))}
                    </div>
                  </div>
                  {bodyRows}
                </div> */}
              </Canvas>
            </EventsProvider>
          </CanvasProvider>
        </TimelineDataProvider>
      </TimelineProvider>
    </div>
  )
}

ReactTimeline.propTypes = {
  children: PropTypes.node,

  defaultZoom: PropTypes.number,
  defaultTimeStart: PropTypes.oneOf(PropTypes.date, PropTypes.shape({ format: PropTypes.func })),
  defaultTimeEnd: PropTypes.oneOf(PropTypes.date, PropTypes.shape({ format: PropTypes.func })),

  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string, PropTypes.number),

  config: ConfigPropTypes.config,
  layout: ConfigPropTypes.layout,
  design: ConfigPropTypes.design,

  ...ConfigPropTypes.events,
}

ReactTimeline.defaultProps = {
  children: undefined,
  defaultZoom: 0,
  defaultTimeStart: undefined,
  defaultTimeEnd: undefined,
  selected: [],
  config: {},
  layout: {},
  design: {}
}

export default ReactTimeline
