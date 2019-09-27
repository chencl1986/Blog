import React from 'react'
import moment from 'moment'
import createTimer, {TimerProps} from '../utils/createTimer';

// 表单字段类型
export interface Props extends TimerProps {

}

export class State {

}

export class ShowTimerComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = new State()
  }

  render() {
    return (
      <p>
        {moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}
      </p>
    )
  }

}

// 导出用HOC创建的新组件
const ShowTimer = createTimer(ShowTimerComponent)

export default ShowTimer
