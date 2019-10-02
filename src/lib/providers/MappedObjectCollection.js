
function createObjectMaps(objArray, idKey) {
  const id = {}
  const order = {}
  objArray.forEach((obj, index) => {
    const objId = obj[idKey]
    id[objId] = index
    order[index] = objId
  })
  return { id, order }
}

export default class MappedObjectCollection {

  constructor(items, idKey = 'id') {
    this.idKey = idKey
    this.data = items

    const maps = createObjectMaps(items, idKey)

    this.id = maps.id
    this.order = maps.order
  }

  getIndexForId(id) {
    return this.id[id] || -1
  }

  getById(id) {
    const index = this.getIndexForId(id)
    if (index < 0) return undefined
    return this.data[index]
  }

  getIdForPosition(position) {
    return this.order[position]
  }

  getByPosition(position) {
    const id = this.getIdForPosition(position)
    return this.getById(id)
  }

  containsId(id) {
    return id in this.id
  }

  setItem(item) {
    const index = this.getIndexForId(item[this.idKey])
    if (index < 0) {
      this.addItem(item)
    } else {
      this.data[index] = item
    }
  }

  addItem(item) {
    const index = this.data.length
    const id = item[this.idKey]

    this.data.push(item)
    this.id[id] = index
    this.order[index] = id
  }

  removeItem(item) {
    const id = item[this.idKey]
    const index = this.getIndexForId(id)

    delete(this.id[id])
    for (let i = index; i < this.data.length - 1; i++) {
      this.order[i] = this.order[i + 1]
    }
    this.order.pop()
    this.data.splice(index, 1)
  }

  compare(other) {
    const changed = []
    const added = []
    const removed = []
    const removedIds = []

    if (!this.data || this.data.length === 0) {
      return {
        changed,
        added: other.data,
        removed,
        removedIds,
      }
    }

    const missingIds = Object.keys(this.id)

    // find added and changed items
    Object.keys(other.id).forEach((currentId) => {
      const currentItem = other.getById(currentId)
      const previousItem = this.getById(currentId)

      if (!previousItem) {
        added.push(currentItem)
        return
      }

      // Since we found this item remove it's id from the missingIds array
      const index = missingIds.indexOf(currentId)
      missingIds.splice(index, 1)

      if (currentItem !== previousItem) {
        changed.push(currentItem)
      }
    })

    missingIds.forEach((missingId) => {
      removedIds.push(missingId)
      removed.push(this.getById(missingId))
    })

    return {
      changed,
      added,
      removed,
      removedIds,
    }
  }
}
