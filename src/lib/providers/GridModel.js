import { _get } from '../utility/generic'

export default class GridModel {
  constructor(group, keys) {
    this.id = _get(group, keys.groupIdKey)
    this.title = _get(group, keys.groupTitleKey)
    this.rightTitle = _get(group, keys.groupRightTitleKey)
    this.label = _get(group, keys.groupLabelKey)
    this.items = []
  }
}
