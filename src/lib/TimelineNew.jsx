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
  let dragStartPosition = null
  let dragLastPosition = null
  let isDragging = false

  const [state, setState] = React.useState({
    dragStartPosition: null,
    dragLastPosition: null,
    isDragging: false,

  });

  // const handleScroll = () => {
  //   const scrollX = this.scrollComponent.scrollLeft
  //   this.props.onScroll(scrollX)
  // }

  // const handleWheel = e => {
  //   // zoom in the time dimension
  //   if (e.ctrlKey || e.metaKey || e.altKey) {
  //     e.preventDefault()
  //     const parentPosition = getParentPosition(e.currentTarget)
  //     const xPosition = e.clientX - parentPosition.x

  //     const speed = e.ctrlKey ? 10 : e.metaKey ? 3 : 1

  //     // convert vertical zoom to horiziontal
  //     this.props.onWheelZoom(speed, xPosition, e.deltaY)
  //   } else if (e.shiftKey) {
  //     e.preventDefault()
  //     // shift+scroll event from a touchpad has deltaY property populated; shift+scroll event from a mouse has deltaX
  //     this.scrollRef.current.scrollLeft += e.deltaY || e.deltaX

  //     // no modifier pressed? we prevented the default event, so scroll or zoom as needed
  //   }
  // }

  const handleMouseDown = e => {
    if (e.button === 0) {
      dragStartPosition = e.pageX
      dragLastPosition = e.pageX
      isDragging = true
      // setState({
      //   isDragging: true
      // })
    }
  }

  const handleMouseMove = e => {
    // this.props.onMouseMove(e)
    //why is interacting with item important?
    if (isDragging) { // && !this.props.isInteractingWithItem
      scrollRef.current.scrollLeft += dragLastPosition - e.pageX
      dragLastPosition = e.pageX
    }
  }

  const handleMouseUp = () => {
    dragStartPosition = null
    dragLastPosition = null
    isDragging = false
    // setState({
    //   isDragging: false
    // })
  }

  const handleMouseLeave = () => {
    // this.props.onMouseLeave(e)
    dragStartPosition = null
    dragLastPosition = null
    isDragging = false
    // setState({
    //   isDragging: false
    // })
  }

  const handleTouchStart = e => {
    if (e.touches.length === 2) {
      e.preventDefault()

      this.lastTouchDistance = Math.abs(
        e.touches[0].screenX - e.touches[1].screenX
      )
      this.singleTouchStart = null
      this.lastSingleTouch = null
    } else if (e.touches.length === 1) {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      this.lastTouchDistance = null
      this.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset }
      this.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset }
    }
  }

  const handleTouchMove = e => {
    const { isInteractingWithItem, width, onZoom } = this.props
    if (isInteractingWithItem) {
      e.preventDefault()
      return
    }
    if (this.lastTouchDistance && e.touches.length === 2) {
      e.preventDefault()
      let touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX)
      let parentPosition = getParentPosition(e.currentTarget)
      let xPosition =
        (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x
      if (touchDistance !== 0 && this.lastTouchDistance !== 0) {
        onZoom(this.lastTouchDistance / touchDistance, xPosition / width)
        this.lastTouchDistance = touchDistance
      }
    } else if (this.lastSingleTouch && e.touches.length === 1) {
      e.preventDefault()
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      let deltaX = x - this.lastSingleTouch.x
      let deltaX0 = x - this.singleTouchStart.x
      let deltaY0 = y - this.singleTouchStart.y
      this.lastSingleTouch = { x: x, y: y }
      let moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0)
      let moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0)
      if (deltaX !== 0 && moveX) {
        this.scrollComponent.scrollLeft -= deltaX
      }
      if (moveY) {
        window.scrollTo(
          window.pageXOffset,
          this.singleTouchStart.screenY - deltaY0
        )
      }
    }
  }

  const handleTouchEnd = () => {
    if (this.lastTouchDistance) {
      this.lastTouchDistance = null
    }
    if (this.lastSingleTouch) {
      this.lastSingleTouch = null
      this.singleTouchStart = null
    }
  }

  let scrollRef = React.createRef();

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

  const handleCanvasClick = (e) => {
    console.log('Canvas click', e);
  }
  const itemCount = 72
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
    for (let i = 0; i < itemCount; i++) {
      items.push(<div key={i} className={rowItemClassName}>&nbsp;</div>)
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
    <div
      className="react-calendar-timeline"
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="rct-canvas">
        <div className="rct-row rct-header rct-sticky">
          <div className="rct-sidebar left">Sidebar Header</div>
          <div className="rct-header-timeline">
            {getHeaderGroup(moment({ year: 2019, month: 8, day: 30 }))}
            {getHeaderGroup(moment({ year: 2019, month: 9, day: 1 }))}
            {getHeaderGroup(moment({ year: 2019, month: 9, day: 2 }))}
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
