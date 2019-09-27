import React from 'react'
import moment from 'moment'
import {Modal} from 'antd';
import {ModalProps} from 'antd/lib/modal';
import createTimer, {TimerProps} from '../utils/createTimer';

// 表单字段类型
export interface Props extends ModalProps, TimerProps {

}

export class State {
  visible: boolean = false
}

export class ShowTimerModalComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = new State()
  }

  // 打开弹窗
  public show = (): void => {
    this.setState({
      visible: true
    })
  }

  // 关闭弹窗
  public hide = (): void => {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title={'弹窗显示时间'}
        maskClosable
        cancelButtonProps={{style: {display: 'none'}}}
        onCancel={this.hide}
        onOk={this.hide}
      >
        {moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}
      </Modal>
    )
  }

}

// 导出用HOC创建的新组件
const ShowTimerModal = createTimer(ShowTimerModalComponent)

export default ShowTimerModal
