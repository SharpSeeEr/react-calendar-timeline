import React from 'react'
import PropTypes from 'prop-types'
import { useCanvasState } from './CanvasProvider'

function iterateTimes(start, end, unit, timeSteps, callback) {
  let time = moment(start).startOf(unit)

  if (timeSteps[unit] && timeSteps[unit] > 1) {
    let value = time.get(unit)
    time.set(unit, value - value % timeSteps[unit])
  }

  while (time.valueOf() < end) {
    let nextTime = moment(time).add(timeSteps[unit] || 1, `${unit}s`)
    callback(time, nextTime)
    time = nextTime
  }
}

const headerZoom = {
  0: {
    unit: 'hour',
    width: 55,
  },
  1: {
    unit: 'day',
    width: 45,
  },
  2: {
    unit: 'month',
    width: 115,
  },
  3: {
    unit: 'quarter',
    width: 115,
  },
  4: {
    unit: 'year',
    width: 140,
  }
}
 // Next: create arrays for rendering primary and secondary header rows, then generate them.
function HeaderProvider({
  children,
}) {
  const canvasState = useCanvasState()
  const [state, setState] = React.useState({})

  React.useEffect(() => {

  }, [canvasState.zoomLevel, canvasState.width, canvasState.timeStart ])

}
