import React from 'react'

const CanvasStateContext = React.createContext()
const CanvasDispatchContext = React.createContext()


const initialCanvasState = {
  zoomLevel: 0,
  height: 0,
  width: 1000,
  canvasTimeStart: 0,
  visibleTimeStart: 0,
  groupDimensions: [],
  itemDimensions: [],
}

function CanvasProvider({
  children,
  zoomLevel,
  canvasTimeStart,
  visibleTimeStart,
  groupHeights,
  width,
  height
}) {

}
