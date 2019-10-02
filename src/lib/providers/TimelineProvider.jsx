import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash.merge'
import {
  defaultConfig,
  ConfigPropTypes,
} from '../default-config'

const TimelineStateContext = React.createContext()

function TimelineProvider({
  children,
  config,
}) {

  const mergedConfig = merge(
    { ...defaultConfig },
    config,
  );

  return (
    <TimelineStateContext.Provider value={mergedConfig}>
      {/* <TimelineDispatchContext.Provider value={dispatch}> */}
        {children}
      {/* </TimelineDispatchContext.Provider> */}
    </TimelineStateContext.Provider>
  )
}

TimelineProvider.propTypes = {
  children: PropTypes.node,
  config: ConfigPropTypes.config,
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
