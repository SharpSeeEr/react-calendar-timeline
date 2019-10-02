// TODO: can we use getBoundingClientRect instead??
// last place this is used is in "handleWheel" in ScrollElement
export function getParentPosition(element) {
  let xPosition = 0
  let yPosition = 0
  let first = true

  let parent = element
  while (parent) {
    if (
      !parent.offsetParent &&
      parent.tagName === 'BODY' &&
      parent.scrollLeft === 0 &&
      parent.scrollTop === 0
    ) {
      parent = document.scrollingElement || parent
    }
    xPosition +=
      parent.offsetLeft - (first ? 0 : parent.scrollLeft) + parent.clientLeft
    yPosition +=
      parent.offsetTop - (first ? 0 : parent.scrollTop) + parent.clientTop
    parent = parent.offsetParent
    first = false
  }
  return { x: xPosition, y: yPosition }
}

export function getSumScroll(node) {
  if (node === document.body) {
    return {scrollLeft: 0, scrollTop: 0}
  }
  const parent = getSumScroll(node.parentNode)
  return ({
    scrollLeft: node.scrollLeft + parent.scrollLeft,
    scrollTop: node.scrollTop + parent.scrollTop
  })
}

export function getSumOffset(node) {
  if (node === document.body) {
    return {offsetLeft: 0, offsetTop: 0}
  }
  const parent = getSumOffset(node.offsetParent)
  return ({
    offsetLeft: node.offsetLeft + parent.offsetLeft,
    offsetTop: node.offsetTop + parent.offsetTop
  })
}
