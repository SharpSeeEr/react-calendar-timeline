import React from 'react'
import PropTypes from 'prop-types'

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

  const getBodyItems = () => {
    const items = [];
    for (let i = 0; i < 75; i++) {
      items.push(<div className="rct-row-item">&nbsp;</div>)
    }
    return items;
  }
  const bodyRows = groups.map(group => (
    <div key={group[config.keys['groupIdKey']]} className="rct-row">
      <div className="rct-sidebar" style={{ width: '150px' }}>
        {group[config.keys['groupIdKey']]}
      </div>
      {getBodyItems()}
    </div>
  ))

  return (
    <div className="react-calendar-timeline">
            <div className="rct-header">
              <div className="rct-sidebar" style={{ width: '150px' }} />
              <div className="rct-header-timeline" style={{ width: 'calc(100% - 150px)' }}>
                <div className="rct-header-row rct-header-row-primary" style={{ width: '3741px' }}>
                  <div className="rct-header-item" style={{ left: '0px', width: '1247px' }}>
                    <span>Monday, September 30, 2019</span>
                  </div>
                  <div className="rct-header-item" style={{ left: '1247px', width: '1247px' }}>
                    <span>Tuesday, October 1, 2019</span>
                  </div>
                  <div className="rct-header-item" style={{ left: '2494px', width: '1247px' }}>
                    <span>Wednesday, October 2, 2019</span>
                  </div>
                </div>
                <div className="rct-header-row rct-header-row-secondary" style={{ width: '3741px' }}>
                  <div className="rct-header-item" style={{ left: '0px' }}><span>00:00</span></div>
                  <div className="rct-header-item" style={{ left: '51.9583px' }}><span>01:00</span></div>
                  <div className="rct-header-item" style={{ left: '103.917px' }}><span>02:00</span></div>
                  <div className="rct-header-item" style={{ left: '155.875px' }}><span>03:00</span></div>
                  <div className="rct-header-item" style={{ left: '207.833px' }}><span>04:00</span></div>
                  <div className="rct-header-item" style={{ left: '259.792px' }}><span>05:00</span></div>
                  <div className="rct-header-item" style={{ left: '311.75px' }}><span>06:00</span></div>
                  <div className="rct-header-item" style={{ left: '363.708px' }}><span>07:00</span></div>
                  <div className="rct-header-item" style={{ left: '415.667px' }}><span>08:00</span></div>
                  <div className="rct-header-item" style={{ left: '467.625px' }}><span>09:00</span></div>
                  <div className="rct-header-item" style={{ left: '519.583px' }}><span>10:00</span></div>
                  <div className="rct-header-item" style={{ left: '571.542px' }}><span>11:00</span></div>
                  <div className="rct-header-item" style={{ left: '623.5px' }}><span>12:00</span></div>
                  <div className="rct-header-item" style={{ left: '675.458px' }}><span>13:00</span></div>
                  <div className="rct-header-item" style={{ left: '727.417px' }}><span>14:00</span></div>
                  <div className="rct-header-item" style={{ left: '779.375px' }}><span>15:00</span></div>
                  <div className="rct-header-item" style={{ left: '831.333px' }}><span>16:00</span></div>
                  <div className="rct-header-item" style={{ left: '883.292px' }}><span>17:00</span></div>
                  <div className="rct-header-item" style={{ left: '935.25px' }}><span>18:00</span></div>
                  <div className="rct-header-item" style={{ left: '987.208px' }}><span>19:00</span></div>
                  <div className="rct-header-item" style={{ left: '1039.17px' }}><span>20:00</span></div>
                  <div className="rct-header-item" style={{ left: '1091.13px' }}><span>21:00</span></div>
                  <div className="rct-header-item" style={{ left: '1143.08px' }}><span>22:00</span></div>
                  <div className="rct-header-item" style={{ left: '1195.04px' }}><span>23:00</span></div>
                  <div className="rct-header-item" style={{ left: '1247px' }}><span>00:00</span></div>
                  <div className="rct-header-item" style={{ left: '1298.96px' }}><span>01:00</span></div>
                  <div className="rct-header-item" style={{ left: '1350.92px' }}><span>02:00</span></div>
                  <div className="rct-header-item" style={{ left: '1402.88px' }}><span>03:00</span></div>
                  <div className="rct-header-item" style={{ left: '1454.83px' }}><span>04:00</span></div>
                  <div className="rct-header-item" style={{ left: '1506.79px' }}><span>05:00</span></div>
                  <div className="rct-header-item" style={{ left: '1558.75px' }}><span>06:00</span></div>
                  <div className="rct-header-item" style={{ left: '1610.71px' }}><span>07:00</span></div>
                  <div className="rct-header-item" style={{ left: '1662.67px' }}><span>08:00</span></div>
                  <div className="rct-header-item" style={{ left: '1714.63px' }}><span>09:00</span></div>
                  <div className="rct-header-item" style={{ left: '1766.58px' }}><span>10:00</span></div>
                  <div className="rct-header-item" style={{ left: '1818.54px' }}><span>11:00</span></div>
                  <div className="rct-header-item" style={{ left: '1870.5px' }}><span>12:00</span></div>
                  <div className="rct-header-item" style={{ left: '1922.46px' }}><span>13:00</span></div>
                  <div className="rct-header-item" style={{ left: '1974.42px' }}><span>14:00</span></div>
                  <div className="rct-header-item" style={{ left: '2026.38px' }}><span>15:00</span></div>
                  <div className="rct-header-item" style={{ left: '2078.33px' }}><span>16:00</span></div>
                  <div className="rct-header-item" style={{ left: '2130.29px' }}><span>17:00</span></div>
                  <div className="rct-header-item" style={{ left: '2182.25px' }}><span>18:00</span></div>
                  <div className="rct-header-item" style={{ left: '2234.21px' }}><span>19:00</span></div>
                  <div className="rct-header-item" style={{ left: '2286.17px' }}><span>20:00</span></div>
                  <div className="rct-header-item" style={{ left: '2338.13px' }}><span>21:00</span></div>
                  <div className="rct-header-item" style={{ left: '2390.08px' }}><span>22:00</span></div>
                  <div className="rct-header-item" style={{ left: '2442.04px' }}><span>23:00</span></div>
                  <div className="rct-header-item" style={{ left: '2494px' }}><span>00:00</span></div>
                  <div className="rct-header-item" style={{ left: '2545.96px' }}><span>01:00</span></div>
                  <div className="rct-header-item" style={{ left: '2597.92px' }}><span>02:00</span></div>
                  <div className="rct-header-item" style={{ left: '2649.88px' }}><span>03:00</span></div>
                  <div className="rct-header-item" style={{ left: '2701.83px' }}><span>04:00</span></div>
                  <div className="rct-header-item" style={{ left: '2753.79px' }}><span>05:00</span></div>
                  <div className="rct-header-item" style={{ left: '2805.75px' }}><span>06:00</span></div>
                  <div className="rct-header-item" style={{ left: '2857.71px' }}><span>07:00</span></div>
                  <div className="rct-header-item" style={{ left: '2909.67px' }}><span>08:00</span></div>
                  <div className="rct-header-item" style={{ left: '2961.63px' }}><span>09:00</span></div>
                  <div className="rct-header-item" style={{ left: '3013.58px' }}><span>10:00</span></div>
                  <div className="rct-header-item" style={{ left: '3065.54px' }}><span>11:00</span></div>
                  <div className="rct-header-item" style={{ left: '3117.5px' }}><span>12:00</span></div>
                  <div className="rct-header-item" style={{ left: '3169.46px' }}><span>13:00</span></div>
                  <div className="rct-header-item" style={{ left: '3221.42px' }}><span>14:00</span></div>
                  <div className="rct-header-item" style={{ left: '3273.38px' }}><span>15:00</span></div>
                  <div className="rct-header-item" style={{ left: '3325.33px' }}><span>16:00</span></div>
                  <div className="rct-header-item" style={{ left: '3377.29px' }}><span>17:00</span></div>
                  <div className="rct-header-item" style={{ left: '3429.25px' }}><span>18:00</span></div>
                  <div className="rct-header-item" style={{ left: '3481.21px' }}><span>19:00</span></div>
                  <div className="rct-header-item" style={{ left: '3533.17px' }}><span>20:00</span></div>
                  <div className="rct-header-item" style={{ left: '3585.13px' }}><span>21:00</span></div>
                  <div className="rct-header-item" style={{ left: '3637.08px' }}><span>22:00</span></div>
                  <div className="rct-header-item" style={{ left: '3689.04px' }}><span>23:00</span></div>
                </div>
              </div>
            </div>
            <div className="rct-body" style={{  }}>
              {/* <div className="rct-sidebar" style={{ width: '150px' }}>Sidebar</div> */}
              <div className="rct-body-timeline" style={{ width: '5000px', height: '2000px', backgroundColor: 'aqua' }}>
                {bodyRows}
              </div>
            </div>
          </div>
    // <TimelineProvider {...config}>
    //   <TimelineDataProvider groups={groups} items={items}>
    //     <EventsProvider {...events}>
    //       <CanvasProvider zoomLevel={defaultZoom} defaultTimeStart={defaultTimeStart}>

    //       </CanvasProvider>
    //     </EventsProvider>
    //   </TimelineDataProvider>
    // </TimelineProvider>
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
