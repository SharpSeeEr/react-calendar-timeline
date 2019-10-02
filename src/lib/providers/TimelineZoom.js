import moment from 'moment'

const HOUR = 'HOUR'
// const DAY = 'DAY'
const WEEK = 'WEEK'
const MONTH = 'MONTH'
const SIXMONTH = 'SIXMONTH'
const YEAR = 'YEAR'
const TWOYEAR = 'TWOYEAR'
const FIVEYEAR = 'FIVEYEAR'

const zoomLevels = [
  HOUR,
  // DAY,
  WEEK,
  MONTH,
  SIXMONTH,
  YEAR,
  TWOYEAR,
  FIVEYEAR,
]

const timespanToZoomLevelMap = zoomLevels.reduce((current, ts, index) => {
  return { ...current, [ts]: index }
}, {})

function createDefaultTimeSetting(unit, start, end) {
  return { unit, start, end }
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

export const defaultOffsets = {
  [HOUR]: createDefaultTimeSetting('days', -1, 1),
  // [DAY]: createDefaultTimeSetting('days', -2, 1),
  [WEEK]: createDefaultTimeSetting('weeks', -2, 2),
  [MONTH]: createDefaultTimeSetting('months', -1, 1),
  [SIXMONTH]: createDefaultTimeSetting('months', -6, 6),
  [YEAR]: createDefaultTimeSetting('years', -1, 1),
  [TWOYEAR]: createDefaultTimeSetting('years', -2, 2),
  [FIVEYEAR]: createDefaultTimeSetting('years', -5, 5),
}

export const timespanUtilities = {
  [HOUR]: {
    defaultOffsets: createDefaultTimeSetting('days', -1, 1),
    startTimeForZoom: (m => m.startOf(0)),
    endTimeforZoom: (m => m.endOf('day'))
  },
  [DAY]: {
    defaultOffsets: createDefaultTimeSetting('days', -2, 1),
    startTimeForZoom: (m => m.startOf('days')),
    endTimeforZoom: (m => m.endOf('day'))
  },
  [WEEK]: {
    defaultOffsets: createDefaultTimeSetting('weeks', -2, 2),
    startTimeForZoom: (m => m.startOf(0)),
    endTimeforZoom: (m => m.endOf('day'))
  },
  [MONTH]: {
    defaultOffsets: createDefaultTimeSetting('months', -1, 1),
    startTimeForZoom: (m => m.startOf(0)),
    endTimeforZoom: (m => m.endOf('day'))
  },
  [SIXMONTH]: {
    defaultOffsets: createDefaultTimeSetting('months', -6, 6),
    startTimeForZoom: (m => m.startOf(0)),
    endTimeforZoom: (m => m.endOf('day'))
  },
  [YEAR]: {
    defaultOffsets: createDefaultTimeSetting('years', -1, 1),
    startTimeForZoom: (m => m.startOf(0)),
    endTimeforZoom: (m => m.endOf('day'))
  },
  [TWOYEAR]: {
    defaultOffsets: createDefaultTimeSetting('years', -2, 2),
    startTimeForZoom: (m => m.startOf(0)),
    endTimeforZoom: (m => m.endOf('day'))
  },
  [FIVEYEAR]: {
    defaultOffsets: createDefaultTimeSetting('years', -5, 5),
    startTimeForZoom: (m => m.startOf(0)),
    endTimeforZoom: (m => m.endOf('day'))
  },
}

function getStartTime(offset) {

}
const zoomLevelPropType = PropTypes.oneOf(zoomLevels)

export class TimelineZoom {
  constructor(zoomLevel = HOUR) {
    this.level = zoomLevel
    this.datetimeRange = defaultOffsets[zoomLevel]

    this.startTime = moment().add(this.datetimeRange.start, unit))
  }
}
