import React from 'react'

export interface Props {
  wrappedComponentRef?: React.RefObject<React.Component<TimerProps, any, any>>
}

export class State {
  time: Date = new Date()
}

export interface TimerProps {
  time: Date
}

function createTimer(WrappedComponent: React.ComponentClass<TimerProps>): React.ComponentClass<Props> {

  class Timer extends React.Component<Props, State> {

    timer: number = 0

    constructor(props: Props) {
      super(props)

      this.state = new State()
    }

    componentDidMount() {
      this.timer = window.setInterval(() => {
        this.setState({
          time: new Date()
        })
      }, 1000)
    }

    componentWillUnmount() {
      clearInterval(this.timer)
    }

    render() {
      // 为原组件提供time的props后，将其作为组件返回显示，不对UI做修改
      return (
        <WrappedComponent
          ref={this.props.wrappedComponentRef}
          time={this.state.time}
        />
      )
    }

  }

  // 返回新组件
  return Timer

}

export default createTimer
