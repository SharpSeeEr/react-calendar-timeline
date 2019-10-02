import { _get } from '../utility/generic'

export default class GridItem {
  constructor(item, keys) {
    this.id = _get(item, keys.itemIdkey)
    this.title = _get(item, keys.itemTitleKey)
    this.divTitle = _get(item, keys.itemDivTitleKey)
    this.groupId = _get(item, keys.itemGroupKey)
    this.startTime = _get(item, keys.itemTimeStartKey)
    this.endTime = _get(item, keys.itemTimeEndKey)
  }
}
