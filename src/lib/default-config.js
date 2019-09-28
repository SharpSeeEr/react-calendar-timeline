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
  itemTimeEndKey: 'end_time'
}

export const defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1
}

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

//TODO: delete this
export const defaultHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM/YY',
  monthMedium: 'MM/YYYY',
  monthMediumLong: 'MMM YYYY',
  monthLong: 'MMMM YYYY',
  dayShort: 'L',
  dayLong: 'dddd, LL',
  hourShort: 'HH',
  hourMedium: 'HH:00',
  hourMediumLong: 'L, HH:00',
  hourLong: 'dddd, LL, HH:00',
  time: 'LLL'
}

export const defaultSubHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM',
  monthMedium: 'MMM',
  monthLong: 'MMMM',
  dayShort: 'D',
  dayMedium: 'dd D',
  dayMediumLong: 'ddd, Do',
  dayLong: 'dddd, Do',
  hourShort: 'HH',
  hourLong: 'HH:00',
  minuteShort: 'mm',
  minuteLong: 'HH:mm'
}

const hour = 'hour';
const day = 'day';
const week = 'week';
const month = 'month';
const sixmonth = 'sixmonth';
const year = 'year';
const twoyear = 'twoyear';
const fiveyear = 'fiveyear';

export const defaultConfig = {
  headerLabelFormats: defaultHeaderLabelFormats,
  subHeaderLabelFormats: defaultSubHeaderLabelFormats,
  keys: defaultKeys,
  timeSteps: defaultTimeSteps,

  dragSnap: 1000 * 60 * 15, // 15min
  stickyHeader: true,
  minZoom: hour,
  maxZoom: fiveyear,

  canChangeGroup: true,
  canMove: true,
  canResize: 'right',
  useResizeHandle: false,
  canSelect: true,
  stackItems: false,
  itemTouchSendsClick: false,
  clickTolerance: 3,
}

export const defaultLayout = {
  sidebarWidth: 150,
  rightSidebarWidth: 0,
  lineHeight: 30,
  itemHeightRatio: 0.65,
  minResizeWidth: 20,
  style: {},
}

export const defaultDesign = {
  horizontalLineClassNamesForGroup: null,
  verticalLineClassNamesForTime: null,
}
