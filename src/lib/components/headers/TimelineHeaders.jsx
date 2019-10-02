import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Sidebar from '../Sidebar'
import DateHeader from './DateHeader'
import { RIGHT_VARIANT } from './constants'
import { useCanvasState } from '../../timeline/CanvasProvider'
import { useTimelineState } from '../../providers'
import HeaderGroup from './HeaderGroup'


function TimelineHeaders({ children }) {

  const { leftSidebarWidth, rightSidebarWidth } = useCanvasState()
  const { stickyHeader } = useTimelineState()

  const leftSidebarHeader = leftSidebarWidth > 0 ? <Sidebar width={leftSidebarWidth} position="left" /> : undefined
  const rightSidebarHeader = rightSidebarWidth > 0 ? <Sidebar width={rightSidebarWidth} position="right" /> : undefined

  const classNames = classnames('rct-row rct-header', stickyHeader ? 'rct-sticky' : '')

  return (
    <div className={classNames}>
      {leftSidebarHeader}
      <div
        className="rct-header-timeline"
        data-testid="headerContainer"
      >
        <HeaderGroup date={moment({ year: 2019, month: 8, day: 30 })} />
        <HeaderGroup date={moment({ year: 2019, month: 9, day: 1 })} />
        <HeaderGroup date={moment({ year: 2019, month: 9, day: 2 })} />
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
