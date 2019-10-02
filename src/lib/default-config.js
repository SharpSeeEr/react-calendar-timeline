import PropTypes from 'prop-types'

const ConfigPropTypes = {}

export const defaultKeys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  groupLabelKey: 'title',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time',
}

ConfigPropTypes.keys = PropTypes.shape({
  groupIdKey: PropTypes.string,
  groupTitleKey: PropTypes.string,
  groupRightTitleKey: PropTypes.string,
  groupLabelKey: PropTypes.string,
  itemIdKey: PropTypes.string,
  itemTitleKey: PropTypes.string,
  itemDivTitleKey: PropTypes.string,
  itemGroupKey: PropTypes.string,
  itemTimeStartKey: PropTypes.string,
  itemTimeEndKey: PropTypes.string,
})

export const defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1,
}

ConfigPropTypes.timeSteps = PropTypes.shape({
  second: PropTypes.number,
  minute: PropTypes.number,
  hour: PropTypes.number,
  day: PropTypes.number,
  month: PropTypes.number,
  year: PropTypes.number,
})

export const defaultHeaderFormats = {
  year: {
    long: 'YYYY',
    mediumLong: 'YYYY',
    medium: 'YYYY',
    short: 'YY'
  },
  month: {
    long: 'MMMM YYYY',
    mediumLong: 'MMMM',
    medium: 'MMMM',
    short: 'MM/YY'
  },
  week: {
    long: 'w',
    mediumLong: 'w',
    medium: 'w',
    short: 'w'
  },
  day: {
    long: 'dddd, LL',
    mediumLong: 'dddd, LL',
    medium: 'dd D',
    short: 'D'
  },
  hour: {
    long: 'dddd, LL, HH:00',
    mediumLong: 'L, HH:00',
    medium: 'HH:00',
    short: 'HH'
  },
  minute: {
    long: 'HH:mm',
    mediumLong: 'HH:mm',
    medium: 'HH:mm',
    short: 'mm',
  }
}

ConfigPropTypes.headerFormat = PropTypes.shape({
  long: PropTypes.string,
  mediumLong: PropTypes.string,
  medium: PropTypes.string,
  short: PropTypes.string,
})

ConfigPropTypes.headerFormats = PropTypes.shape({
  year: ConfigPropTypes.headerFormat,
  month: ConfigPropTypes.headerFormat,
  week: ConfigPropTypes.headerFormat,
  day: ConfigPropTypes.headerFormat,
  hour: ConfigPropTypes.headerFormat,
  minute: ConfigPropTypes.headerFormat,
})

const HOUR = 'HOUR'
const DAY = 'DAY'
const WEEK = 'WEEK'
const MONTH = 'MONTH'
const SIXMONTH = 'SIXMONTH'
const YEAR = 'YEAR'
const TWOYEAR = 'TWOYEAR'
const FIVEYEAR = 'FIVEYEAR'

export const timespans = [
  HOUR,
  DAY,
  WEEK,
  MONTH,
  SIXMONTH,
  YEAR,
  TWOYEAR,
  FIVEYEAR,
]

const zoomLevelPropType = PropTypes.oneOf(timespans)

export const defaultConfig = {
  headerLabelFormats: defaultHeaderFormats,
  keys: defaultKeys,
  timeSteps: defaultTimeSteps,

  dragSnap: 1000 * 60 * 15, // 15min
  stickyHeader: true,
  minZoom: HOUR,
  maxZoom: FIVEYEAR,

  canChangeGroup: true,
  canMove: true,
  canResize: 'right',
  useResizeHandle: false,
  canSelect: true,
  stackItems: false,
  itemTouchSendsClick: false,
  clickTolerance: 3,
}

ConfigPropTypes.config = PropTypes.shape({
  headerFormats: ConfigPropTypes.headerFormats,
  keys: ConfigPropTypes.keys,
  timeSteps: ConfigPropTypes.timeSteps,
  dragSnap: PropTypes.number,
  stickyHeader: PropTypes.bool,
  minZoom: zoomLevelPropType,
  maxZoom: zoomLevelPropType,
  canChangeGroup: PropTypes.bool,
  canMove: PropTypes.bool,
  canResize: PropTypes.oneOf(['right', 'left', 'both', false]),
  useResizeHandle: PropTypes.bool,
  canSelect: PropTypes.bool,
  stackItems: PropTypes.bool,
  itemTouchSendsClick: PropTypes.bool,
  clickTolerance: PropTypes.number,
})

export const defaultLayout = {
  sidebarWidth: 150,
  rightSidebarWidth: 0,
  lineHeight: 30,
  itemHeightRatio: 0.65,
  minResizeWidth: 20,
  style: {},
}

ConfigPropTypes.layout = PropTypes.shape({
  leftSidebarWidth: PropTypes.number,
  rightSidebarWidth: PropTypes.number,
  lineHeight: PropTypes.number,
  itemHeightRatio: PropTypes.number,
  minResizeWidth: PropTypes.number,
  style: PropTypes.object,
})

export const defaultDesign = {
  horizontalLineClassNamesForGroup: null,
  verticalLineClassNamesForTime: null,
}

ConfigPropTypes.design = PropTypes.shape({
  horizontalLineClassNamesForGroup: PropTypes.string,
  verticalLineClassNamesForTime: PropTypes.string,
})


ConfigPropTypes.events = {
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

export {
  ConfigPropTypes
}
