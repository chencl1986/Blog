import React from 'react'
import {observer} from 'mobx-react';
import {observable, runInAction, toJS} from 'mobx';
import hoistStatics from 'hoist-non-react-statics';
import AsyncValidator, {Rules, ValidateError, ErrorList, RuleItem} from 'async-validator';

// setFieldsValue设置表单数据时传入的数据类型
export class Values {
  [propName: string]: any
}

// 表单项设置
export class FieldOption {
  initialValue?: any
  rules: RuleItem[] = []
}

// 表单项数据
export class Field {
  value: any
  errors: ErrorList = []
}

// 表格数据
export class Fields {
  [propName: string]: Field
}

// 表单项设置数据
export class FieldMeta {
  name: string = ''
  fieldOption: FieldOption = new FieldOption()
}

// 表格设置数据
export class FieldsMeta {
  [propName: string]: FieldMeta
}

export interface Props {
  wrappedComponentRef: React.RefObject<React.Component<FormComponentProps, any, any>>
}

// 为原组件添加的form参数
export interface FormProps {
  getFieldDecorator: (name: string, fieldOption: FieldOption) => (fieldElem: React.ReactElement) => React.ReactElement
  getFieldValue: (name: string) => any
  setFieldsValue: (values: any) => void
  getFieldsValue: () => any
  validateFields: (callback?: (errors: any, values: any) => void) => void
  resetFields: () => void
  getFieldError: (name: string) => ErrorList
}

// 为原组件添加的props
export interface FormComponentProps {
  form: FormProps
}

export class State {

}

function createForm(WrappedComponent: React.ComponentClass<FormComponentProps>): React.ComponentClass<Props> {

  @observer
  class Form extends React.Component<Props, State> {

    // 表单数据
    @observable
    private fields: Fields = new Fields()

    // 表单原始数据
    @observable
    private fieldsMeta: FieldsMeta = new FieldsMeta()

    constructor(props: Props) {
      super(props)

      this.state = new State()
    }

    // 创建表单项的props，提供给getFieldDecorator绑定事件
    private getFieldProps = (
      name: string,
      fieldOption: FieldOption = new FieldOption()
    ): any => {
      const initialValue = fieldOption.initialValue

      runInAction(() => {
        if (!this.fields[name]) {
          this.fields[name] = new Field()
          if (initialValue) {
            this.fields[name].value = initialValue
          }
        }

        if (!this.fieldsMeta[name]) {
          this.fieldsMeta[name] = {
            name,
            fieldOption
          }
        }
      })

      return {
        value: toJS(this.fields)[name].value,
        onChange: (event: React.ChangeEvent<HTMLInputElement> | string): void => {
          if (typeof event === 'string') {
            this.fields[name].value = event
          } else {
            this.fields[name].value = event.target.value
          }
          this.forceUpdate()
          this.validateField(name)
        }
      }
    }

    // 创建新表单项组件的HOC
    private getFieldDecorator = (
      name: string,
      fieldOption: FieldOption = new FieldOption()
    ): (fieldElem: React.ReactElement) => React.ReactElement => {
      const props = this.getFieldProps(name, fieldOption)

      return (fieldElem: React.ReactElement): React.ReactElement => {
        return React.cloneElement(
          fieldElem,
          props
        )
      }
    }

    // 获取表单项数据
    private getFieldValue = (name: string): any => {
      const field = toJS(this.fields)[name]
      return field && field.value
    }

    // 获取所有表单数据
    private getFieldsValue = (): Values => {
      const fields = toJS(this.fields)
      let values: Values = {}
      Object.keys(fields).forEach((name: string): void => {
        values[name] = fields[name]
      })

      return values
    }

    // 设置表单项的值
    private setFieldsValue = (values: Values): void => {
      const fields = toJS(this.fields)
      Object.keys(values).forEach((name: string): void => {
        fields[name].value = values[name]
      })
      this.fields = fields
    }

    // 获取用于表单校验的值和规则
    private getRulesValues = (name?: string): {rules: Rules, values: Fields} => {
      const fields = toJS(this.fields)
      const fieldsMeta = toJS(this.fieldsMeta)
      const fieldMetaArr: FieldMeta[] = name ? [fieldsMeta[name]] : Object.values(fieldsMeta)
      const values: Fields = new Fields()
      const rules: Rules = fieldMetaArr.reduce((rules: Rules, item: FieldMeta): Rules => {
        if (item.fieldOption.rules.length) {
          values[item.name] = fields[item.name].value
          return {
            ...rules,
            [item.name]: item.fieldOption.rules
          }
        }
        return rules
      }, {})

      return {rules, values}
    }

    // 校验单个表单项
    private validateField = (name: string): void => {
      const {rules, values} = this.getRulesValues(name)
      const validator = new AsyncValidator(rules)

      validator.validate(values, {}, (errors: ErrorList): void => {
        if (errors) {
          errors.forEach((error: ValidateError): void => {
            this.fields[name].errors.push(error)
          })
        } else {
          this.fields[name].errors = []
        }
      })
    }

    // 校验整个表单
    private validateFields = (callback?: (errors: ErrorList | null, values: Fields) => void): void => {
      const {rules, values} = this.getRulesValues()
      const validator = new AsyncValidator(rules)

      validator.validate(values, {}, (errors: ErrorList): void => {
        if (errors) {
          errors.forEach((error: ValidateError): void => {
            this.fields[error.field].errors.push(error)
          })
        } else {
          Object.keys(values).forEach((name: string): void => {
            this.fields[name].errors = []
          })
        }
        callback && callback(errors, values)
      })

      // 强制渲染组件，避免
      this.forceUpdate()
    }

    // 重置表单
    private resetFields = (): void => {
      this.fields = Object.values(toJS(this.fieldsMeta)).reduce((fields: Fields, item: FieldMeta): Fields => {
        fields[item.name] = new Field()
        fields[item.name].value = item.fieldOption.initialValue
        return fields
      }, new Fields())
    }

    // 获取表单项的校验结果
    private getFieldError = (name: string): ErrorList => {
      return this.fields[name] ? this.fields[name].errors : []
    }

    render() {
      let props: FormComponentProps = {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          getFieldValue: this.getFieldValue,
          getFieldsValue: this.getFieldsValue,
          setFieldsValue: this.setFieldsValue,
          validateFields: this.validateFields,
          resetFields: this.resetFields,
          getFieldError: this.getFieldError,
        }
      }

      return (
        <WrappedComponent
          ref={this.props.wrappedComponentRef}
          {...props}
        />
      )
    }

  }

  // 使用hoist-non-react-statics库，复制所有静态方法，请查看：
  // https://github.com/mridgway/hoist-non-react-statics
  // https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  return hoistStatics(Form, WrappedComponent)
}

export default createForm
