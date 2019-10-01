import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash.merge'
import {
  defaultConfig,
  ConfigPropTypes,
} from './default-config'

const TimelineStateContext = React.createContext()

function TimelineProvider({
  children,
  headerFormats,
  keys,
  timeSteps,
  dragSnap,
  stickyHeader,
  minZoom,
  maxZoom,
  canChangeGroup,
  canMove,
  canResize,
  useResizeHandle,
  canSelect,
  stackItems,
  itemTouchSendsClick,
  clickTolerance,
}) {

  const config = merge(
    { ...defaultConfig },
    {
      headerFormats,
      keys,
      timeSteps,
      dragSnap,
      stickyHeader,
      minZoom,
      maxZoom,
      canChangeGroup,
      canMove,
      canResize,
      useResizeHandle,
      canSelect,
      stackItems,
      itemTouchSendsClick,
      clickTolerance,
    }
  );

  return (
    <TimelineStateContext.Provider value={config}>
      {/* <TimelineDispatchContext.Provider value={dispatch}> */}
        {children}
      {/* </TimelineDispatchContext.Provider> */}
    </TimelineStateContext.Provider>
  )
}

TimelineProvider.propTypes = {
  children: PropTypes.element.isRequired,
  ...ConfigPropTypes.config,
};

function useTimelineState() {
  const context = React.useContext(TimelineStateContext)
  if (context === undefined) {
    throw new Error('useTimelineState must be used within a TimelineProvider')
  }
  return context
}

// function useTimelineDispatch() {
//   const context = React.useContext(TimelineDispatchContext)
//   if (context === undefined) {
//     throw new Error('useTimelineDispatch must be used within a TimelineProvider')
//   }
//   return context
// }

export {
  TimelineProvider,
  useTimelineState,
  // useTimelineDispatch,
}
