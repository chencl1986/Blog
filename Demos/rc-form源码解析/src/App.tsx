/**
 * Created by xm_chenli@huayun.com on 2019/09/01 16:49.
 */

import React from 'react'
import './App.css'
import {Button} from 'antd';
import FormModal, {FormModalComponent} from './components/FormModal';
import ShowTimer from './components/ShowTimer';
import ShowTimerModal, {ShowTimerModalComponent} from './components/ShowTimerModal';
import NewFormModal, {NewFormModalComponent} from './components/NewFormModal';

interface Props {

}

class State {

}

class App extends React.Component<Props, State> {

  showTimerModalRef: React.RefObject<ShowTimerModalComponent> = React.createRef()

  formModalRef: React.RefObject<FormModalComponent> = React.createRef()

  newFormModalRef: React.RefObject<NewFormModalComponent> = React.createRef()

  constructor(props: Props) {
    super(props)

    this.state = new State()
  }

  // 打开显示时间弹窗
  private onTimerModalButtonClick = (): void => {
    const showTimerModal = this.showTimerModalRef.current
    showTimerModal && showTimerModal.show()
  }

  // 打开表单弹窗
  private onFormModalButtonClick = (): void => {
    const formModal = this.formModalRef.current
    formModal && formModal.show()
  }

  // 打开新表单弹窗
  private onNewFormModalButtonClick = (): void => {
    const newFormModal = this.newFormModalRef.current
    newFormModal && newFormModal.show()
  }

  componentDidMount() {

  }

  render() {
    return (
      <div
        className={'app'}
      >
        <Button
          onClick={this.onFormModalButtonClick}
        >
          表单弹窗
        </Button>
        <ShowTimer />
        <Button
          onClick={this.onTimerModalButtonClick}
        >
          时间弹窗
        </Button>
        <Button
          onClick={this.onNewFormModalButtonClick}
        >
          新表单弹窗
        </Button>
        <FormModal
          wrappedComponentRef={this.formModalRef}
        />
        <ShowTimerModal
          wrappedComponentRef={this.showTimerModalRef}
        />
        <NewFormModal
          wrappedComponentRef={this.newFormModalRef}
        />
      </div>
    )
  }

}

export default App
