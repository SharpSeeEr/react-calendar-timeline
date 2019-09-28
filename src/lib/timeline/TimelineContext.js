import React from 'react'
import PropTypes from 'prop-types'
import {
  calculateXPositionForTime,
  calculateTimeForXPosition
} from '../utility/calendar'
import {
  defaultKeys,
  defaultTimeSteps,
  defaultHeaderLabelFormats,
  defaultSubHeaderLabelFormats
} from './default-config'

/* this context will hold all information regarding timeline state:
  1. timeline width
  2. visible time start and end
  3. canvas time start and end
  4. helpers for calculating left offset of items (and really...anything)
*/

/* eslint-disable no-console */
const defaultContextState = {
  getTimelineState: () => {
    console.warn('"getTimelineState" default func is being used')
  },
  getLeftOffsetFromDate: () => {
    console.warn('"getLeftOffsetFromDate" default func is being used')
  },
  getDateFromLeftOffsetPosition: () => {
    console.warn('"getDateFromLeftOffsetPosition" default func is being used')
  },
  showPeriod: () => {
    console.warn('"showPeriod" default func is being used')
  }
}
/* eslint-enable */

const TimelineStateContext = React.createContext()
const TimelineDispatchContext = React.createContext()

const defaultConfig = {
  headerLabelFormats: defaultHeaderLabelFormats,
  subHeaderLabelFormats: defaultSubHeaderLabelFormats,
  keys: defaultKeys,
  timeSteps: defaultTimeSteps,

  dragSnap: 1000 * 60 * 15, // 15min
  stickyHeader: true,
  minZoom: 60 * 60 * 1000, // 1 hour
  maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years

  canChangeGroup: true,
  canMove: true,
  canResize: 'right',
  useResizeHandle: false,
  canSelect: true,
  stackItems: false,
  itemTouchSendsClick: false,
}

function TimelineProvider({ children }) {


  const [state, dispatch] = React.useReducer(timelineReducer, initialState)
  return (
    <TimelineStateContext.Provider value={state}>
      <TimelineDispatchContext.Provider value={dispatch}>
        {children}
      </TimelineDispatchContext.Provider>
    </TimelineStateContext.Provider>
  )
}

TimelineProvider.propTypes = {
  children: PropTypes.element.isRequired
}

class TimelineProvider2 extends React.Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    children: PropTypes.element.isRequired,
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    showPeriod: PropTypes.func.isRequired,
    timelineUnit: PropTypes.string.isRequired,
    timelineWidth: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      timelineContext: {
        config: {
          keys: {},
          dragSnap: 0,
          minResizeWidth: 0,

        },
        zoom: 0,
        canvas: {
          width: 1000,
          timeStart: props.canvasTimeStart,
          timeEnd: props.canvasTimeEnd,
        },
        getTimelineState: this.getTimelineState,
        getLeftOffsetFromDate: this.getLeftOffsetFromDate,
        getDateFromLeftOffsetPosition: this.getDateFromLeftOffsetPosition,
        showPeriod: this.props.showPeriod,
        selectItem: () => null,
        dragItem: () => null,
        dropItem: () => null,

      }
    }
  }

  getTimelineState = () => {
    const {
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      timelineUnit,
      timelineWidth,
    } = this.props
    return {
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      timelineUnit,
      timelineWidth,
    } // REVIEW,
  }

  getLeftOffsetFromDate = date => {
    const { canvasTimeStart, canvasTimeEnd, canvasWidth } = this.props
    return calculateXPositionForTime(
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      date
    )
  }

  getDateFromLeftOffsetPosition = leftOffset => {
    const { canvasTimeStart, canvasTimeEnd, canvasWidth } = this.props
    return calculateTimeForXPosition(
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      leftOffset
    )
  }

  render() {
    return (
      <Provider value={this.state.timelineContext}>
        {this.props.children}
      </Provider>
    )
  }
}

function useTimelineState() {
  const context = React.useContext(TimelineStateContext)
  if (context === undefined) {
    throw new Error('useTimelineState must be used within a TimelineProvider')
  }
  return context
}

function useTimelineDispatch() {
  const context = React.useContext(TimelineDispatchContext)
  if (context === undefined) {
    throw new Error('useTimelineDispatch must be used within a TimelineProvider')
  }
  return context
}

export {
  TimelineProvider,
  useTimelineState,
  useTimelineDispatch,
}
