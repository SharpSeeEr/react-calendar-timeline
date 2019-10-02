import React from 'react'
import PropTypes from 'prop-types'
import { ConfigPropTypes } from '../default-config'

const EventsContext = React.createContext()

function EventsProvider({
  children,
  events,
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
  })

  const addEventHandler = (eventName, handler) => {
    const handlers = state[eventName]
    if (!handlers) {
      throw new Error(`Invalid event name "${eventName}" passed to EventsContext.addEventHandler()`)
    }
    if (handler && state[eventName].indexOf(handler) < 0) {
      setState({ ...state, [eventName]: [...state[eventName], handler]})
    }
  }

  const addEventHandlers = (eventsCollection) => {
    Object.keys(eventsCollection).forEach((key) => {
      if (typeof eventsCollection[key] === 'function') {
        addEventHandler(key, eventsCollection[key])
      }
    })
  }

  const fire = (eventName, ...args) => {
    const handlers = state[eventName]
    if (!handlers) {
      throw new Error(`Invalid event name "${eventName}" passed to EventsContext.fire()`)
    }
    handlers.forEach(handler => handler(...args))
  }

  addEventHandlers(events)

  const [contextState] = React.useState({ addEventHandler, fire })

  return (
    <EventsContext.Provider value={contextState}>
      {children}
    </EventsContext.Provider>
  )
}

EventsProvider.propTypes = {
  children: PropTypes.node,
  events: PropTypes.shape(ConfigPropTypes.events),
}

EventsProvider.defaultProps = {
  children: undefined,
  events: {
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
    onTimeChange: null,
    // called when the canvas area of the calendar changes
    onBoundsChange: null,
  }
}

function useEvents() {
  const context = React.useContext(EventsContext)
  if (context === undefined) {
    throw new Error('useCanvasState must be used within an EventsProvider')
  }
  return context
}

export {
  EventsProvider,
  useEvents,
}
