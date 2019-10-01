import React from 'react'
import PropTypes from 'prop-types'

const EventsContext = React.createContext()

function EventsProvider({
  children,

  onItemMove,
  onItemResize,
  onItemClick,
  onItemSelect,
  onItemDeselect,
  onItemDrag,
  onItemDoubleClick,
  onItemContextMenu,

  onCanvasClick,
  onCanvasDoubleClick,
  onCanvasContextMenu,
  onZoom,

  onTimeChange,
  onBoundsChange,
}) {
  const [state, setState] = React.useState({
    onItemMove: [],
    onItemResize: [],
    onItemClick: [],
    onItemSelect: [],
    onItemDeselect: [],
    onItemDrag: [],
    onItemDoubleClick: [],
    onItemContextMenu: [],
    onCanvasClick: [],
    onCanvasDoubleClick: [],
    onCanvasContextMenu: [],
    onZoom: [],
    onTimeChange: [],
    onBoundsChange: [],
  });

  const addEventHandler = (eventName, handler) => {
    const handlers = state[eventName]
    if (!handlers) {
      throw new Error(`Invalid event name "${eventName}" passed to EventsContext.addEventHandler()`)
    }
    if (handler && state[eventName].indexOf(handler) < 0) {
      setState({ ...state, [eventName]: [...state[eventName], handler]})
    }
  }

  const fire = (eventName, ...args) => {
    const handlers = state[eventName]
    if (!handlers) {
      throw new Error(`Invalid event name "${eventName}" passed to EventsContext.fire()`)
    }
    handlers.forEach(handler => handler(...args))
  }

  React.useEffect(() => addEventHandler('onItemMove', onItemMove), [onItemMove])
  React.useEffect(() => addEventHandler('onItemResize', onItemResize), [onItemResize])
  React.useEffect(() => addEventHandler('onItemClick', onItemClick), [onItemClick])
  React.useEffect(() => addEventHandler('onItemSelect', onItemSelect), [onItemSelect])
  React.useEffect(() => addEventHandler('onItemDeselect', onItemDeselect), [onItemDeselect])
  React.useEffect(() => addEventHandler('onItemDrag', onItemDrag), [onItemDrag])
  React.useEffect(() => addEventHandler('onItemDoubleClick', onItemDoubleClick), [onItemDoubleClick])
  React.useEffect(() => addEventHandler('onItemContextMenu', onItemContextMenu), [onItemContextMenu])
  React.useEffect(() => addEventHandler('onCanvasClick', onCanvasClick), [onCanvasClick])
  React.useEffect(() => addEventHandler('onCanvasDoubleClick', onCanvasDoubleClick), [onCanvasDoubleClick])
  React.useEffect(() => addEventHandler('onCanvasContextMenu', onCanvasContextMenu), [onCanvasContextMenu])
  React.useEffect(() => addEventHandler('onZoom', onZoom), [onZoom])
  React.useEffect(() => addEventHandler('onTimeChange', onTimeChange), [onTimeChange])
  React.useEffect(() => addEventHandler('onBoundsChange', onBoundsChange), [onBoundsChange])

  const [contextState] = React.useState({ addEventHandler, fire })

  return (
    <EventsContext.Provider value={contextState}>
      {children}
    </EventsContext.Provider>
  )
}

EventsProvider.propTypes = {
  children: PropTypes.node,
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

EventsProvider.defaultProps = {
  onItemClick: null,
  onItemSelect: null,
  onItemDeselect: null,
  onItemDrag: null,
  onItemMove: null,
  onItemResize: null,
  onItemDoubleClick: null,
  onItemContextMenu: null,

  onCanvasClick: null,
  onCanvasDoubleClick: null,
  onCanvasContextMenu: null,
  onZoom: null,

  onTimeChange: function(
    visibleTimeStart,
    visibleTimeEnd,
    updateScrollCanvas
  ) {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
  },
  // called when the canvas area of the calendar changes
  onBoundsChange: null,
}

function useEvents() {
  const context = React.useContext(EventsContext)
  if (context === undefined) {
    throw new Error('useCanvasState must be used within an EventsProvider')
  }
  return context;
}

export {
  EventsProvider,
  useEvents,
}
