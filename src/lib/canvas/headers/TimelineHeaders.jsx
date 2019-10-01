import React from 'react'
import PropTypes from 'prop-types'
import SidebarHeader from './SidebarHeader'
import DateHeader from './DateHeader'
import { RIGHT_VARIANT } from './constants'
import { useCanvasState } from '../../timeline/CanvasProvider'


function TimelineHeaders({
  children,
}) {

  const { leftSidebarWidth, rightSidebarWidth } = useCanvasState()

  const getCalendarHeaderStyle = () => {
    return {
      overflow: 'hidden',
      width: `calc(100% - ${leftSidebarWidth + rightSidebarWidth}px)`,
    }
  }

  const leftSidebarHeader = leftSidebarWidth > 0 ? <SidebarHeader width={leftSidebarWidth} /> : undefined
  const rightSidebarHeader = rightSidebarWidth > 0 ? <SidebarHeader width={rightSidebarWidth} variant="right" /> : undefined

  return (
    <div className="rct-header">
      {leftSidebarHeader}
      <div
        className="rct-header-timeline"
        data-testid="headerContainer"
      >
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </div>
      {rightSidebarHeader}
    </div>
  )
}
  render() {
    let rightSidebarHeader
    let leftSidebarHeader
    let calendarHeaders = []
    const children = Array.isArray(this.props.children)
      ? this.props.children.filter(c => c)
      : [this.props.children]
    React.Children.map(children, child => {
      if (this.isSidebarHeader(child)) {
        if (child.props.variant === RIGHT_VARIANT) {
          rightSidebarHeader = child
        } else {
          leftSidebarHeader = child
        }
      } else {
        calendarHeaders.push(child)
      }
    })
    if (!leftSidebarHeader) {
      leftSidebarHeader = <SidebarHeader />
    }
    if (!rightSidebarHeader && this.props.rightSidebarWidth) {
      rightSidebarHeader = <SidebarHeader variant="right" />
    }
    return (
      <div
        ref={this.handleRootRef}
        data-testid="headerRootDiv"
        style={this.getRootStyle()}
        className={classNames('rct-header-root', this.props.className)}
      >
        {leftSidebarHeader}
        <div
          className="rct-header-timeline"
          data-testid="headerContainer"
        >
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </div>
        {rightSidebarHeader}
      </div>
    )
  }
}

const TimelineHeadersWrapper = ({
  children,
  style,
  className,
  calendarHeaderStyle,
  calendarHeaderClassName
}) => (
  <TimelineHeadersConsumer>
    {({ leftSidebarWidth, rightSidebarWidth, registerScroll }) => {
      return (
        <TimelineHeaders
          leftSidebarWidth={leftSidebarWidth}
          rightSidebarWidth={rightSidebarWidth}
          registerScroll={registerScroll}
          style={style}
          className={className}
          calendarHeaderStyle={calendarHeaderStyle}
          calendarHeaderClassName={calendarHeaderClassName}
        >
          {children}
        </TimelineHeaders>
      )
    }}
  </TimelineHeadersConsumer>
)

TimelineHeadersWrapper.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  calendarHeaderStyle: PropTypes.object,
  calendarHeaderClassName: PropTypes.string
}

TimelineHeadersWrapper.secretKey = "TimelineHeaders"

export default TimelineHeadersWrapper
