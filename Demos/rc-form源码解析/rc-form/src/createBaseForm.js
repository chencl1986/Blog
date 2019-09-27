/* eslint-disable react/prefer-es6-class */
/* eslint-disable prefer-promise-reject-errors */

import React from 'react';
import createReactClass from 'create-react-class';
import AsyncValidator from 'async-validator';
import warning from 'warning';
import get from 'lodash/get';
import set from 'lodash/set';
import eq from 'lodash/eq';
import createFieldsStore from './createFieldsStore';
import {
  argumentContainer,
  identity,
  normalizeValidateRules,
  getValidateTriggers,
  getValueFromEvent,
  hasRules,
  getParams,
  isEmptyObject,
  flattenArray,
} from './utils';

const DEFAULT_TRIGGER = 'onChange';

function createBaseForm(option = {}, mixins = []) {
  const {
    validateMessages,
    onFieldsChange,
    onValuesChange,
    mapProps = identity,
    mapPropsToFields,
    fieldNameProp,
    fieldMetaProp,
    fieldDataProp,
    formPropName = 'form',
    name: formName,
    // @deprecated
    withRef,
  } = option;

  return function decorate(WrappedComponent) {
    const Form = createReactClass({
      mixins,

      /* 
       * 相当于
       * constructor(props) {
       *   super(props);
       *   this.state = {count: props.initialCount};
       * }
       */
      getInitialState() {
        // option.mapPropsToFields:	将值从props转换为字段。用于从redux store读取字段。
        const fields = mapPropsToFields && mapPropsToFields(this.props);
        // createFieldsStore为该组件提供了存储、读取、设置表单数据等功能
        this.fieldsStore = createFieldsStore(fields || {});

        this.instances = {};
        this.cachedBind = {};
        this.clearedFieldMetaCache = {};

        this.renderFields = {};
        this.domFields = {};

        // 为组件绑定了一系列方法，这些方法会通过props传入新组件供其使用
        // HACK: https://github.com/ant-design/ant-design/issues/6406
        ['getFieldsValue',
          'getFieldValue',
          'setFieldsInitialValue',
          'getFieldsError',
          'getFieldError',
          'isFieldValidating',
          'isFieldsValidating',
          'isFieldsTouched',
          'isFieldTouched'].forEach(key => {
            this[key] = (...args) => {
              if (process.env.NODE_ENV !== 'production') {
                warning(
                  false,
                  'you should not use `ref` on enhanced form, please use `wrappedComponentRef`. ' +
                  'See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140'
                );
              }

              // 该组件中的方法，直接调用了fieldsStore中的方法，也就是由createFieldsStore方法创建的
              return this.fieldsStore[key](...args);
            };
          });

        return {
          submitting: false,
        };
      },

      componentDidMount() {
        this.cleanUpUselessFields();
      },

      componentWillReceiveProps(nextProps) {
        if (mapPropsToFields) {
          this.fieldsStore.updateFields(mapPropsToFields(nextProps));
        }
      },

      componentDidUpdate() {
        this.cleanUpUselessFields();
      },

      onCollectCommon(name, action, args) {
        const fieldMeta = this.fieldsStore.getFieldMeta(name);
        if (fieldMeta[action]) {
          fieldMeta[action](...args);
        } else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
          fieldMeta.originalProps[action](...args);
        }
        // 通过getValueFromEvent方法，获取当前表单项的值
        const value = fieldMeta.getValueFromEvent ?
          fieldMeta.getValueFromEvent(...args) :
          getValueFromEvent(...args);
        if (onValuesChange && value !== this.fieldsStore.getFieldValue(name)) {
          const valuesAll = this.fieldsStore.getAllValues();
          const valuesAllSet = {};
          valuesAll[name] = value;
          Object.keys(valuesAll).forEach(key => set(valuesAllSet, key, valuesAll[key]));
          onValuesChange({
            [formPropName]: this.getForm(),
            ...this.props
          }, set({}, name, value), valuesAllSet);
        }
        const field = this.fieldsStore.getField(name);
        return ({name, field: {...field, value, touched: true}, fieldMeta});
      },

      onCollect(name_, action, ...args) {
        const {name, field, fieldMeta} = this.onCollectCommon(name_, action, args);
        const {validate} = fieldMeta;

        this.fieldsStore.setFieldsAsDirty();

        const newField = {
          ...field,
          dirty: hasRules(validate),
        };
        this.setFields({
          [name]: newField,
        });
      },

      onCollectValidate(name_, action, ...args) {
        const {field, fieldMeta} = this.onCollectCommon(name_, action, args);
        const newField = {
          ...field,
          dirty: true,
        };

        this.fieldsStore.setFieldsAsDirty();

        this.validateFieldsInternal([newField], {
          action,
          options: {
            firstFields: !!fieldMeta.validateFirst,
          },
        });
      },

      // 返回一个表单项的onChange事件
      getCacheBind(name, action, fn) {
        if (!this.cachedBind[name]) {
          this.cachedBind[name] = {};
        }
        const cache = this.cachedBind[name];
        if (!cache[action] || cache[action].oriFn !== fn) {
          cache[action] = {
            fn: fn.bind(this, name, action),
            oriFn: fn,
          };
        }
        return cache[action].fn;
      },

      // 创建新的表单项组件
      getFieldDecorator(name, fieldOption) {
        // 获取新表单项的props，主要是value属性和onChange事件等
        const props = this.getFieldProps(name, fieldOption);

        return (fieldElem) => {
          // We should put field in record if it is rendered
          this.renderFields[name] = true;

          const fieldMeta = this.fieldsStore.getFieldMeta(name);
          const originalProps = fieldElem.props;

          // 这段是在生产环境的打印提示语
          if (process.env.NODE_ENV !== 'production') {
            const valuePropName = fieldMeta.valuePropName;
            warning(
              !(valuePropName in originalProps),
              `\`getFieldDecorator\` will override \`${valuePropName}\`, ` +
              `so please don't set \`${valuePropName}\` directly ` +
              `and use \`setFieldsValue\` to set it.`
            );
            const defaultValuePropName =
              `default${valuePropName[0].toUpperCase()}${valuePropName.slice(1)}`;
            warning(
              !(defaultValuePropName in originalProps),
              `\`${defaultValuePropName}\` is invalid ` +
              `for \`getFieldDecorator\` will set \`${valuePropName}\`,` +
              ` please use \`option.initialValue\` instead.`
            );
          }

          fieldMeta.originalProps = originalProps;
          fieldMeta.ref = fieldElem.ref;

          return React.cloneElement(fieldElem, {
            ...props,
            // 该方法用于返回当前表单存储的value值
            ...this.fieldsStore.getFieldValuePropValue(fieldMeta),
          });
        };
      },

      // 创建表单项组件的props
      getFieldProps(name, usersFieldOption = {}) {
        if (!name) {
          throw new Error('Must call `getFieldProps` with valid name string!');
        }
        if (process.env.NODE_ENV !== 'production') {
          warning(
            this.fieldsStore.isValidNestedFieldName(name),
            `One field name cannot be part of another, e.g. \`a\` and \`a.b\`. Check field: ${name}`
          );
          warning(
            !('exclusive' in usersFieldOption),
            '`option.exclusive` of `getFieldProps`|`getFieldDecorator` had been remove.'
          );
        }

        delete this.clearedFieldMetaCache[name];

        const fieldOption = {
          name,
          trigger: DEFAULT_TRIGGER,
          valuePropName: 'value',
          validate: [],
          ...usersFieldOption,
        };

        const {
          rules,
          trigger,
          validateTrigger = trigger,
          validate,
        } = fieldOption;

        const fieldMeta = this.fieldsStore.getFieldMeta(name);
        if ('initialValue' in fieldOption) {
          fieldMeta.initialValue = fieldOption.initialValue;
        }

        const inputProps = {
          ...this.fieldsStore.getFieldValuePropValue(fieldOption),
          ref: this.getCacheBind(name, `${name}__ref`, this.saveRef),
        };
        if (fieldNameProp) {
          inputProps[fieldNameProp] = formName ? `${formName}_${name}` : name;
        }

        const validateRules = normalizeValidateRules(validate, rules, validateTrigger);
        const validateTriggers = getValidateTriggers(validateRules);
        validateTriggers.forEach((action) => {
          if (inputProps[action]) return;
          inputProps[action] = this.getCacheBind(name, action, this.onCollectValidate);
        });

        // 使用onCollect方法，获取绑定表单项输入值事件，将其存储到inputProps中，并返回给组件用作props
        // make sure that the value will be collect
        if (trigger && validateTriggers.indexOf(trigger) === -1) {
          // getCacheBind负责返回一个表单项的onChange事件
          inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
        }

        const meta = {
          ...fieldMeta,
          ...fieldOption,
          validate: validateRules,
        };
        // 将表单设置如initialValue、validateRules等，存储到this.fieldsStore.fieldsMeta[name]中
        this.fieldsStore.setFieldMeta(name, meta);
        if (fieldMetaProp) {
          inputProps[fieldMetaProp] = meta;
        }

        if (fieldDataProp) {
          inputProps[fieldDataProp] = this.fieldsStore.getField(name);
        }

        // This field is rendered, record it
        this.renderFields[name] = true;

        return inputProps;
      },

      getFieldInstance(name) {
        return this.instances[name];
      },

      getRules(fieldMeta, action) {
        const actionRules = fieldMeta.validate.filter((item) => {
          return !action || item.trigger.indexOf(action) >= 0;
        }).map((item) => item.rules);
        return flattenArray(actionRules);
      },

      setFields(maybeNestedFields, callback) {
        const fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields);
        this.fieldsStore.setFields(fields);
        if (onFieldsChange) {
          const changedFields = Object.keys(fields)
            .reduce((acc, name) => set(acc, name, this.fieldsStore.getField(name)), {});
          onFieldsChange({
            [formPropName]: this.getForm(),
            ...this.props
          }, changedFields, this.fieldsStore.getNestedAllFields());
        }
        this.forceUpdate(callback);
      },

      setFieldsValue(changedValues, callback) {
        const {fieldsMeta} = this.fieldsStore;

        // 过滤出已注册的表单项的值
        const values = this.fieldsStore.flattenRegisteredFields(changedValues);
        const newFields = Object.keys(values).reduce((acc, name) => {
          const isRegistered = fieldsMeta[name];
          if (process.env.NODE_ENV !== 'production') {
            warning(
              isRegistered,
              'Cannot use `setFieldsValue` until ' +
              'you use `getFieldDecorator` or `getFieldProps` to register it.'
            );
          }
          if (isRegistered) {
            const value = values[name];
            acc[name] = {
              value,
            };
          }
          return acc;
        }, {});

        // 设置表单的值
        this.setFields(newFields, callback);

        if (onValuesChange) {
          const allValues = this.fieldsStore.getAllValues();
          onValuesChange({
            [formPropName]: this.getForm(),
            ...this.props
          }, changedValues, allValues);
        }
      },

      saveRef(name, _, component) {
        if (!component) {
          const fieldMeta = this.fieldsStore.getFieldMeta(name);
          if (!fieldMeta.preserve) {
            // after destroy, delete data
            this.clearedFieldMetaCache[name] = {
              field: this.fieldsStore.getField(name),
              meta: fieldMeta,
            };
            this.clearField(name);
          }
          delete this.domFields[name];
          return;
        }
        this.domFields[name] = true;
        this.recoverClearedField(name);
        const fieldMeta = this.fieldsStore.getFieldMeta(name);
        if (fieldMeta) {
          const ref = fieldMeta.ref;
          if (ref) {
            if (typeof ref === 'string') {
              throw new Error(`can not set ref string for ${name}`);
            } else if (typeof ref === 'function') {
              ref(component);
            } else if (Object.prototype.hasOwnProperty.call(ref, 'current')) {
              ref.current = component;
            }
          }
        }
        this.instances[name] = component;
      },

      cleanUpUselessFields() {
        const fieldList = this.fieldsStore.getAllFieldsName();
        const removedList = fieldList.filter(field => {
          const fieldMeta = this.fieldsStore.getFieldMeta(field);
          return (!this.renderFields[field] && !this.domFields[field] && !fieldMeta.preserve);
        });
        if (removedList.length) {
          removedList.forEach(this.clearField);
        }
        this.renderFields = {};
      },

      clearField(name) {
        this.fieldsStore.clearField(name);
        delete this.instances[name];
        delete this.cachedBind[name];
      },

      resetFields(ns) {
        // 获取清空了所有fields中存储数据的对象
        const newFields = this.fieldsStore.resetFields(ns);
        if (Object.keys(newFields).length > 0) {
          // 为newFields中的各个字段赋值，由于数据都为空，则会从fieldMeta中查找initialValue赋值。
          this.setFields(newFields);
        }
        if (ns) {
          const names = Array.isArray(ns) ? ns : [ns];
          names.forEach(name => delete this.clearedFieldMetaCache[name]);
        } else {
          this.clearedFieldMetaCache = {};
        }
      },

      recoverClearedField(name) {
        if (this.clearedFieldMetaCache[name]) {
          this.fieldsStore.setFields({
            [name]: this.clearedFieldMetaCache[name].field,
          });
          this.fieldsStore.setFieldMeta(name, this.clearedFieldMetaCache[name].meta);
          delete this.clearedFieldMetaCache[name];
        }
      },

      // 校验表单方法
      validateFieldsInternal(fields, {
        fieldNames,
        action,
        options = {},
      }, callback) {
        const allRules = {};
        const allValues = {};
        const allFields = {};
        const alreadyErrors = {};
        // 先清空已有的校验结果
        fields.forEach((field) => {
          const name = field.name;
          if (options.force !== true && field.dirty === false) {
            if (field.errors) {
              set(alreadyErrors, name, {errors: field.errors});
            }
            return;
          }
          const fieldMeta = this.fieldsStore.getFieldMeta(name);
          const newField = {
            ...field,
          };
          newField.errors = undefined;
          newField.validating = true;
          newField.dirty = true;
          allRules[name] = this.getRules(fieldMeta, action);
          allValues[name] = newField.value;
          allFields[name] = newField;
        });
        this.setFields(allFields);
        // in case normalize
        Object.keys(allValues).forEach((f) => {
          allValues[f] = this.fieldsStore.getFieldValue(f);
        });
        if (callback && isEmptyObject(allFields)) {
          callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors,
            this.fieldsStore.getFieldsValue(fieldNames));
          return;
        }

        // 使用AsyncValidator进行校验，并返回校验结果
        const validator = new AsyncValidator(allRules);
        if (validateMessages) {
          validator.messages(validateMessages);
        }
        validator.validate(allValues, options, (errors) => {
          const errorsGroup = {
            ...alreadyErrors,
          };
          // 如果校验不通过，则整理AsyncValidator返回的数据，并存储到表单数据中
          if (errors && errors.length) {
            errors.forEach((e) => {
              const errorFieldName = e.field;
              let fieldName = errorFieldName;

              // Handle using array validation rule.
              // ref: https://github.com/ant-design/ant-design/issues/14275
              Object.keys(allRules).some((ruleFieldName) => {
                const rules = allRules[ruleFieldName] || [];

                // Exist if match rule
                if (ruleFieldName === errorFieldName) {
                  fieldName = ruleFieldName;
                  return true;
                }

                // Skip if not match array type
                if (rules.every(({type}) => type !== 'array') && errorFieldName.indexOf(ruleFieldName) !== 0) {
                  return false;
                }

                // Exist if match the field name
                const restPath = errorFieldName.slice(ruleFieldName.length + 1);
                if (/^\d+$/.test(restPath)) {
                  fieldName = ruleFieldName;
                  return true;
                }

                return false;
              });

              const field = get(errorsGroup, fieldName);
              if (typeof field !== 'object' || Array.isArray(field)) {
                set(errorsGroup, fieldName, {errors: []});
              }
              const fieldErrors = get(errorsGroup, fieldName.concat('.errors'));
              fieldErrors.push(e);
            });
          }
          const expired = [];
          const nowAllFields = {};
          Object.keys(allRules).forEach((name) => {
            const fieldErrors = get(errorsGroup, name);
            const nowField = this.fieldsStore.getField(name);
            // avoid concurrency problems
            if (!eq(nowField.value, allValues[name])) {
              expired.push({
                name,
              });
            } else {
              nowField.errors = fieldErrors && fieldErrors.errors;
              nowField.value = allValues[name];
              nowField.validating = false;
              nowField.dirty = false;
              nowAllFields[name] = nowField;
            }
          });
          // 存储新校验结果
          this.setFields(nowAllFields);
          if (callback) {
            if (expired.length) {
              expired.forEach(({name}) => {
                const fieldErrors = [{
                  message: `${name} need to revalidate`,
                  field: name,
                }];
                set(errorsGroup, name, {
                  expired: true,
                  errors: fieldErrors,
                });
              });
            }

            callback(isEmptyObject(errorsGroup) ? null : errorsGroup,
              this.fieldsStore.getFieldsValue(fieldNames));
          }
        });
      },

      // 校验表单方法，主要用于整理需要校验的表单项数据后，调用validateFieldsInternal进行校验
      validateFields(ns, opt, cb) {
        const pending = new Promise((resolve, reject) => {
          // 因传入的3个参数都为可选，需要将它们整理成固定的names, options, callback参数。
          const {names, options} = getParams(ns, opt, cb);
          let {callback} = getParams(ns, opt, cb);
          if (!callback || typeof callback === 'function') {
            const oldCb = callback;
            callback = (errors, values) => {
              if (oldCb) {
                oldCb(errors, values);
              } else if (errors) {
                reject({errors, values});
              } else {
                resolve(values);
              }
            };
          }
          const fieldNames = names ?
            this.fieldsStore.getValidFieldsFullName(names) :
            this.fieldsStore.getValidFieldsName();

          // 获取需要校验的表单项
          const fields = fieldNames
            // 过滤出已配置rules的字段
            .filter(name => {
              const fieldMeta = this.fieldsStore.getFieldMeta(name);
              return hasRules(fieldMeta.validate);
            })
            // 获取当前表单数据
            .map((name) => {
              const field = this.fieldsStore.getField(name);
              field.value = this.fieldsStore.getFieldValue(name);
              return field;
            });
          if (!fields.length) {
            callback(null, this.fieldsStore.getFieldsValue(fieldNames));
            return;
          }
          if (!('firstFields' in options)) {
            options.firstFields = fieldNames.filter((name) => {
              const fieldMeta = this.fieldsStore.getFieldMeta(name);
              return !!fieldMeta.validateFirst;
            });
          }
          // 调用表单校验方法，进行校验
          this.validateFieldsInternal(fields, {
            fieldNames,
            options,
          }, callback);
        });
        pending.catch((e) => {
          if (console.error && process.env.NODE_ENV !== 'production') {
            console.error(e);
          }
          return e;
        });
        return pending;
      },

      isSubmitting() {
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
          warning(
            false,
            '`isSubmitting` is deprecated. ' +
            'Actually, it\'s more convenient to handle submitting status by yourself.'
          );
        }
        return this.state.submitting;
      },

      submit(callback) {
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
          warning(
            false,
            '`submit` is deprecated. ' +
            'Actually, it\'s more convenient to handle submitting status by yourself.'
          );
        }
        const fn = () => {
          this.setState({
            submitting: false,
          });
        };
        this.setState({
          submitting: true,
        });
        callback(fn);
      },

      render() {
        const {wrappedComponentRef, ...restProps} = this.props; // eslint-disable-line
        const formProps = {
          // getForm方法来自于createDOMForm方法调用createBaseForm方法时，传入的mixin对象
          // mixin合并了createForm.js中导出的的mixin
          [formPropName]: this.getForm(),
        };
        if (withRef) {
          if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
            warning(
              false,
              '`withRef` is deprecated, please use `wrappedComponentRef` instead. ' +
              'See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140'
            );
          }
          formProps.ref = 'wrappedComponent';
        } else if (wrappedComponentRef) {
          formProps.ref = wrappedComponentRef;
        }

        // 创建新组件的props
        const props = mapProps.call(this, {
          ...formProps,
          ...restProps,
        });
        return <WrappedComponent {...props} />;
      },
    });

    // 使用hoist-non-react-statics库，复制所有静态方法，请查看：
    // https://github.com/mridgway/hoist-non-react-statics
    // https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
    return argumentContainer(Form, WrappedComponent);
  };
}

export default createBaseForm;
