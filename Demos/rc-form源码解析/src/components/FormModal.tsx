import React from 'react'
import {Form, Input, Select} from 'antd'
import {FormComponentProps} from 'antd/lib/form'
import FormItem, {FormItemProps} from 'antd/lib/form/FormItem'
import Modal, {ModalProps} from 'antd/lib/modal'

const Option = Select.Option

// FormItem宽度兼容
export const formItemLayout: FormItemProps = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16}
  }
}
// 性别枚举
enum SexEnum {
  male = 'male',
  female = 'female'
}

// 性别名称枚举
enum SexNameEnum {
  male = '男',
  female = '女'
}

// 表单字段类型
export class FormModalValues {
  username: string = ''
  sex: SexEnum = SexEnum.male
}

export interface Props extends ModalProps, FormComponentProps {

}

export class State {
  visible: boolean = false
}

export class FormModalComponent extends React.Component<Props, State> {

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

  public onOk = async () => {
    // 方法1：使用回调函数获取表单验证结果
    /* this.props.form.validateFields(async (errors: any, {username, sex}: FormModalValues) => {
      if (!errors) {
        Modal.success({
          title: '表单输入结果',
          content: `用户名：${username}，性别：${SexNameEnum[sex]}。`
        })
        this.hide()
      }
    }) */
    // 方法2：使用async函数获取表单验证结果
    try {
      // @ts-ignore
      const {username, sex}: FormModalValues = await this.props.form.validateFields()
      Modal.success({
        title: '表单输入结果',
        content: `用户名：${username}，性别：${SexNameEnum[sex]}。`
      })
      this.hide()
    } catch (error) {
      console.error(error)
      return error
    }
  }

  // 关闭弹窗后初始化弹窗参数
  public afterClose = (): void => {
    // 重置表单
    this.props.form.resetFields()
    this.setState(new State())
  }

  componentDidMount() {
    // 为表单设置初始值，这里与getFieldDecorator方法中的initialValue重复。
    this.props.form.setFieldsValue(new FormModalValues())
  }

  render() {
    const form = this.props.form
    // 获取用户输入的表单数据
    const username: string = form.getFieldValue('username')
    const sex: SexEnum = form.getFieldValue('sex')

    return (
      <Modal
        visible={this.state.visible}
        title={'新建用户'}
        maskClosable
        onCancel={this.hide}
        onOk={this.onOk}
        afterClose={this.afterClose}
        okText={'确认'}
        cancelText={'取消'}
      >
        <FormItem
          label={'请输入用户名'}
          required={true}
          {...formItemLayout}
        >
          {
            // getFieldDecorator为表单组件绑定value和onChange等事件
            form.getFieldDecorator<FormModalValues>(
              // 表单项数据字段
              'username',
              {
                // 表单初始值
                initialValue: '',
                // 表单校验规则
                rules: [
                  {
                    required: true,
                  }
                ]
              }
            )(
              <Input />
            )
          }
        </FormItem>
        <FormItem
          label={'请选择性别'}
          required={true}
          {...formItemLayout}
        >
          {
            // getFieldDecorator为表单组件绑定value和onChange等事件
            form.getFieldDecorator<FormModalValues>(
              // 表单项数据字段
              'sex',
              {
                // 表单初始值
                initialValue: SexEnum.male,
                // 表单校验规则
                rules: [
                  {
                    required: true,
                  }
                ]
              }
            )(
              <Select
                style={{width: '60px'}}
              >
                <Option
                  value={'male'}
                >
                  男
                </Option>
                <Option
                  value={'female'}
                >
                  女
                </Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem
          label={'输入的用户名'}
          {...formItemLayout}
        >
          {username}
        </FormItem>
        <FormItem
          label={'选择的性别'}
          {...formItemLayout}
        >
          {
            SexNameEnum[sex]
          }
        </FormItem>
      </Modal>
    )
  }

}

const FormModal = Form.create<Props>()(FormModalComponent)

export default FormModal
