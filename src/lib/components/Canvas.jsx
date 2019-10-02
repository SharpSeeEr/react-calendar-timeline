import React from 'react'
import PropTypes from 'prop-types'

function Canvas({ children }) {

  let scrollRef = React.useRef();
  let dragRef = React.useRef({
    dragStartPosition: null,
    dragLastPosition: null,
    isDragging: false,
  })

  // let dragStartPosition = null
  // let dragLastPosition = null
  // let isDragging = false

  // const [state, setState] = React.useState({
  //   dragStartPosition: null,
  //   dragLastPosition: null,
  //   isDragging: false,
  // });

  // const handleScroll = () => {
  //   this.props.onScroll(scrollRef.scrollLeft)
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

  const handleMouseMove = e => {
    // this.props.onMouseMove(e)
    //why is interacting with item important?
    if (dragRef.current.isDragging) { // && !this.props.isInteractingWithItem
      console.log('handleMouseMove', e.pageX)
      scrollRef.current.scrollLeft += dragRef.current.dragLastPosition - e.pageX
      dragRef.current.dragLastPosition = e.pageX
    }
  }

  const handleMouseDown = e => {
    console.log('handleMouseDown', e.button)
    if (e.button === 0) {
      scrollRef.current.addEventListener('mousemove', handleMouseMove)
      dragRef.current.dragStartPosition = e.pageX
      dragRef.current.dragLastPosition = e.pageX
      dragRef.current.isDragging = SVGComponentTransferFunctionElement
    }
  }

  const handleMouseUp = () => {
    console.log(('handleMouseUp'))
    scrollRef.current.removeEventListener('mousemove', handleMouseMove)
    dragRef.current = {
      dragStartPosition: null,
      dragLastPosition: null,
      isDragging: false,
    }
    // setState({
    //   isDragging: false
    // })
  }

  // const handleMouseLeave = () => {
  //   // this.props.onMouseLeave(e)
  //   dragStartPosition = null
  //   dragLastPosition = null
  //   isDragging = false
  //   // setState({
  //   //   isDragging: false
  //   // })
  // }

  // const handleTouchStart = e => {
  //   if (e.touches.length === 2) {
  //     e.preventDefault()

  //     this.lastTouchDistance = Math.abs(
  //       e.touches[0].screenX - e.touches[1].screenX
  //     )
  //     this.singleTouchStart = null
  //     this.lastSingleTouch = null
  //   } else if (e.touches.length === 1) {
  //     e.preventDefault()

  //     let x = e.touches[0].clientX
  //     let y = e.touches[0].clientY

  //     this.lastTouchDistance = null
  //     this.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset }
  //     this.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset }
  //   }
  // }

  // const handleTouchMove = e => {
  //   const { isInteractingWithItem, width, onZoom } = this.props
  //   if (isInteractingWithItem) {
  //     e.preventDefault()
  //     return
  //   }
  //   if (this.lastTouchDistance && e.touches.length === 2) {
  //     e.preventDefault()
  //     let touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX)
  //     let parentPosition = getParentPosition(e.currentTarget)
  //     let xPosition =
  //       (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x
  //     if (touchDistance !== 0 && this.lastTouchDistance !== 0) {
  //       onZoom(this.lastTouchDistance / touchDistance, xPosition / width)
  //       this.lastTouchDistance = touchDistance
  //     }
  //   } else if (this.lastSingleTouch && e.touches.length === 1) {
  //     e.preventDefault()
  //     let x = e.touches[0].clientX
  //     let y = e.touches[0].clientY
  //     let deltaX = x - this.lastSingleTouch.x
  //     let deltaX0 = x - this.singleTouchStart.x
  //     let deltaY0 = y - this.singleTouchStart.y
  //     this.lastSingleTouch = { x: x, y: y }
  //     let moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0)
  //     let moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0)
  //     if (deltaX !== 0 && moveX) {
  //       this.scrollComponent.scrollLeft -= deltaX
  //     }
  //     if (moveY) {
  //       window.scrollTo(
  //         window.pageXOffset,
  //         this.singleTouchStart.screenY - deltaY0
  //       )
  //     }
  //   }
  // }

  // const handleTouchEnd = () => {
  //   if (this.lastTouchDistance) {
  //     this.lastTouchDistance = null
  //   }
  //   if (this.lastSingleTouch) {
  //     this.lastSingleTouch = null
  //     this.singleTouchStart = null
  //   }
  // }

  return (
    <div className="rct-canvas"
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      // onWheel={handleWheel}
    >
      {children}
    </div>
  )
}

Canvas.propTypes = {
  children: PropTypes.node,
}

export default Canvas
