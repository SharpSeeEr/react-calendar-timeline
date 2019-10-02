import React from 'react'
import PropTypes from 'prop-types'
import { defaultLayout, ConfigPropTypes } from '../default-config'

const CanvasStateContext = React.createContext()
const CanvasDispatchContext = React.createContext()

function canvasReducer(state, action) {
  return { ...state, ...action.payload }
}

const initialCanvasState = {
  zoomLevel: 0,
  height: 0,
  width: 1000,
  timeStart: 0,
  visibleTimeStart: 0,
  groupDimensions: [],
  itemDimensions: [],
  layout: defaultLayout,
}

function CanvasProvider({
  children,
  zoomLevel,
  defaultTimeStart,
  layout,
}) {
  const [state, dispatch] = React.useReducer(canvasReducer, {
    ...initialCanvasState,
    timeStart: defaultTimeStart,
    zoomLevel,
    layout
  })

  return (
    <CanvasStateContext.Provider value={state}>
      <CanvasDispatchContext.Provider value={dispatch}>
        {children}
      </CanvasDispatchContext.Provider>
    </CanvasStateContext.Provider>
  )
}

CanvasProvider.defaultProps = {
  ...initialCanvasState
}

CanvasProvider.propTypes = {
  children: PropTypes.node.isRequired,
  zoomLevel: PropTypes.number,
  defaultTimeStart: PropTypes.number,
  layout: ConfigPropTypes.layout,
}

function useCanvasState() {
  const context = React.useContext(CanvasStateContext)
  if (context === undefined) {
    throw new Error('useCanvasState must be used within a CanvasProvider')
  }
  return context
}

function useCanvasDispatch() {
  const context = React.useContext(CanvasDispatchContext)
  if (context === undefined) {
    throw new Error('useCanvasDispatch must be used within a CanvasProvider')
  }
  return context
}

export {
  CanvasProvider,
  useCanvasState,
  useCanvasDispatch,
}
