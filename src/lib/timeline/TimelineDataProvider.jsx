import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTimelineState } from './TimelineProvider';
import { _get } from '../utility/generic';

const DataStateContext = React.createContext()
const DataDispatchContext = React.createContext()

const UPDATE_GROUP = 'UPDATE_GROUP';
const UPDATE_ITEM = 'UPDATE_ITEM';

function dataReducer(state, action, keys) {
  switch (action.type) {
    case UPDATE_GROUP:
      return {
        ...state,
        groups: {
          ...state.groups,
          [_get(action.payload, keys.groupIdKey)]: action.payload
        }
      }
    case UPDATE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [_get(action.payload, keys.itemIdkey)]: action.payload
        }
      }
  }
  return state;
}

function initGroups(groups, items, keys) {
  const groupsLookup = groups.reduce((result, current, index) => {
    return { ...result, [_get(current, keys.groupIdKey)]: { index, group: current, items: [] } }
  }, {})

  items.forEach((item) => {
    const group = groupsLookup[_get(item, keys.itemGroupKey)]
    if (group) {
      group.items.push(item)
    }
  })

  return groupsLookup;
}

function TimelineDataProvider({
  children,
  groups,
  items,
}) {
  const config = useTimelineState()
  const reducer = (state, action) => dataReducer(state, action, config.keys)


  const [state, dispatch] = React.useReducer(reducer, initGroups(groups, items, config.keys))

  useEffect(() => {
    // update groups lookup props change
  }, [groups, items])

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  )
}

TimelineDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
  groups: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
}

function useTimelineDataState() {
  const context = React.useContext(DataStateContext)
  if (context === undefined) {
    throw new Error('useTimelineState must be used within a TimelineProvider')
  }
  return context
}

function useTimelineDataDispatch() {
  const context = React.useContext(DataDispatchContext)
  if (context === undefined) {
    throw new Error('useTimelineState must be used within a TimelineProvider')
  }
  return context
}

export {
  TimelineDataProvider,
  useTimelineDataState,
  useTimelineDataDispatch,
}
