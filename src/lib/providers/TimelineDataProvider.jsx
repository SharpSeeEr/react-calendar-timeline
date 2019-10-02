import React from 'react'
import PropTypes from 'prop-types'
import { useTimelineState } from './TimelineProvider'
import MappedObjectCollection from './MappedObjectCollection'
import GridModel from './GridModel'
import GridItem from './GridItem'

const DataStateContext = React.createContext()
const DataDispatchContext = React.createContext()

const UPDATE_GROUPS = 'UPDATE_GROUPS'
const UPDATE_ITEMS = 'UPDATE_ITEMS'
const UPDATE_BOTH = 'UPDATE_BOTH'


function groupsUpdateHandler(state, action, keys) {
  const currentGroups = new MappedObjectCollection(action.payload.groups, keys.groupIdKey)
  const groupDiff = state.groups.compare(currentGroups)

  const { models } = state

  groupDiff.removed.forEach((removed) => {
    models.removeItem(removed)
  })
  groupDiff.changed.forEach((changed) => {
    const previous = models.getById(changed[keys.groupIdKey])
    const model = new GridModel(changed, keys)
    model.items = [...previous.items ]
    models.setItem(model)
  })
  groupDiff.added.forEach((added) => {
    models.addItem(new GridModel(added, keys))
  })

  return {
    groups: currentGroups,
    items: state.items,
    models
  }
}

function itemsUpdateHandler(state, action, keys) {
  const currentItems = new MappedObjectCollection(action.payload.items, keys.itemIdKey)
  const itemDiff = state.items.compare(currentItems)

  const { models } = state

  itemDiff.removed.forEach((removed) => {
    const removedId = removed[keys.itemIdKey]
    const modelId = removed[keys.itemGroupKey]
    const model = models.getById(modelId)
    model.items = models.items.filter(item => item.id !== removedId)
  })
  itemDiff.changed.forEach((changed) => {
    const gridItem = new GridItem(changed, keys)
    const model = models.getById(gridItem.groupId)
    const index = model.items.findIndex(item => item.id === gridItem.id)
    model.items[index] = new GridItem(changed, keys)
  })
  itemDiff.added.forEach((added) => {
    const gridItem = new GridItem(added, keys)
    const model = models.getById(gridItem.groupId)
    if (model) {
      model.items.push(gridItem)
    }
  })

  return {
    groups: state.groups,
    items: currentItems,
    models
  }
}

function groupsAndItemsUpdateHandler(state, action, keys) {
  const { groups } = groupsUpdateHandler(state, action, keys)
  const { items, models } = itemsUpdateHandler(state, action, keys)
  return {
    groups,
    items,
    models
  }
}

function dataReducer(state, action, keys) {
  switch (action.type) {
    case UPDATE_GROUPS:
      return groupsUpdateHandler(state, action, keys)
    case UPDATE_ITEMS:
      return itemsUpdateHandler(state, action, keys)
    case UPDATE_BOTH:
      return groupsAndItemsUpdateHandler(state, action, keys)
    default:
      return state
  }
}

function TimelineDataProvider({
  children,
  groups,
  items,
}) {
  const { keys } = useTimelineState()

  const initialState = {
    groups: new MappedObjectCollection([], keys.groupIdKey),
    items: new MappedObjectCollection([], keys.itemIdKey),
    models: new MappedObjectCollection([])

  }

  const reducer = (state, action) => dataReducer(state, action, keys)

  const [state, dispatch] = React.useReducer(reducer, initialState)

  const getGroup = gridModel => state.groups.getById(gridModel.id)
  const getItem = gridItem => state.items.getById(gridItem.id)

  const providerState = {
    models: state.models.data,
    getGroup,
    getItem
  }

  React.useEffect(() => {
    // update groups lookup props change
    const groupsUpdated = groups === state.groups.data
    const itemsUpdated = items === state.items.data

    const action = {
      type: null,
      payload: {
        groups,
        items
      }
    }
    if (groupsUpdated && itemsUpdated) {
      action.type = UPDATE_BOTH
    } else if (groupsUpdated) {
      action.type = UPDATE_GROUPS
    } else if (itemsUpdated) {
      action.type = UPDATE_ITEMS
    }
    dispatch(action)
  }, [groups, items])

  return (
    <DataStateContext.Provider value={providerState}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  )
}

TimelineDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
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
