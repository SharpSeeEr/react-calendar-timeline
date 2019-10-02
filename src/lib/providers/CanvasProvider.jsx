import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { defaultLayout, ConfigPropTypes } from '../default-config'

const CanvasStateContext = React.createContext()
const CanvasDispatchContext = React.createContext()

const ZOOM_IN = 'ZOOM_IN'
const ZOOM_OUT = 'ZOOM_OUT'
const SET_START_TIME = ''
const SET_END_TIME = ''

function getCanvasStart(timeStart, zoomLevel) {
  return timeStart.startOf(timespanProperties[zoomLevel].unit)
}

function getCanvasEnd(timeEnd, zoomLevel) {
  return timeEnd.endOf(timespanProperties[zoomLevel].unit)
}

function setZoomLevel(state, zoomLevel) {
  return {
    ...state,
    zoomLevel: Math.min(Math.max(zoomLevel, 0), 6),
    canvasStart: getCanvasStart(state.timeStart, zoomLevel),
    canvasEnd: getCanvasEnd(state.timeEnd, zoomLevel)
  }
}

function zoomInHandler(state) {
  return setZoomLevel(state, state.zoomLevel + 1)
}

function zoomOutHandler(state) {
  return setZoomLevel(state, state.zoomLevel - 1)
}

function canvasReducer(state, action) {
  switch (action.type) {
    case ZOOM_IN:
      return zoomInHandler(state)
    case ZOOM_OUT:
      return zoomOutHandler(state)
    default:
      return state
  }
}

function getNextLargerTimespan(timespan) {
  const timespanIndex = zoomLevels.indexOf(timespan)
  if (timespanIndex + 1 === zoomLevels.length) {
    throw Error(`Cannot get larger timespan for largest timespan '${timespan}'`)
  }
  return zoomLevels[timespanIndex + 1]
}

function createTimespan(unit, defaultStartOffset, defaultEndOffset) {
  return {
    unit,
    start: defaultStartOffset,
    end: defaultEndOffset,
  }
}

export class TimelineOffsets {
  constructor(unit, start, end) {
    this.unit = unit
    this.start = 0 - Math.abs(start)
    this.end = Math.abs(end)

    this.startTime = moment().add(this.start, this.unit)
    this.endTime = moment().add(this.end, this.unit)
  }
}

const HOUR = 'HOUR'
// const DAY = 'DAY'
const WEEK = 'WEEK'
const MONTH = 'MONTH'
const SIXMONTH = 'SIXMONTH'
const YEAR = 'YEAR'
const TWOYEAR = 'TWOYEAR'
const FIVEYEAR = 'FIVEYEAR'

export const timespanProperties = {
  [HOUR]: createTimespan('days', -1, 1),
  // [DAY]: createDefaultTimeSetting('days', -2, 1),
  [WEEK]: createTimespan('weeks', -2, 2),
  [MONTH]: createTimespan('months', -1, 1),
  [SIXMONTH]: createTimespan('months', -6, 6),
  [YEAR]: createTimespan('years', -1, 1),
  [TWOYEAR]: createTimespan('years', -2, 2),
  [FIVEYEAR]: createTimespan('years', -5, 5),
}

function calcTimespanPerCell(zoomLevel) {
  return null
}

function CanvasProvider({
  children,
  zoomLevel,
  defaultTimeStart,
  defaultTimeEnd,
  layout,
}) {
  const initialCanvasState = {
    zoomLevel: zoomLevel || 0,
    height: 0,
    width: 1000,
    timeStart: defaultTimeStart,
    timeEnd: defaultTimeEnd,
    canvasStart: getCanvasStart(defaultTimeStart, zoomLevel),
    canvasEnd: getCanvasEnd(defaultTimeEnd, zoomLevel),
    timespanPerCell: calcTimespanPerCell(zoomLevel),
    visibleTimeStart: 0,
    groupDimensions: [],
    itemDimensions: [],
    layout
  }
  initialCanvasState.canvasStart = getCanvasStart(initialCanvasState.timeStart, zoomLevel)
  initialCanvasState.canvasEnd = getCanvasEnd(initialCanvasState.timeEnd, zoomLevel)
  const [state, dispatch] = React.useReducer(canvasReducer, initialCanvasState)

  return (
    <CanvasStateContext.Provider value={state}>
      <CanvasDispatchContext.Provider value={dispatch}>
        {children}
      </CanvasDispatchContext.Provider>
    </CanvasStateContext.Provider>
  )
}

CanvasProvider.defaultProps = {
  zoomLevel: 0,
  defaultTimeStart: moment().add(-1, 'days'),
  defaultTimeEnd: moment().add(1, 'days'),
  layout: defaultLayout,
}

CanvasProvider.propTypes = {
  children: PropTypes.node.isRequired,
  zoomLevel: PropTypes.number,
  defaultTimeStart: PropTypes.number,
  defaultTimeEnd: PropTypes.number,
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
