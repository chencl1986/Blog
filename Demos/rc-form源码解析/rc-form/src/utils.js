import hoistStatics from 'hoist-non-react-statics';
import warning from 'warning';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
}

export function argumentContainer(Container, WrappedComponent) {
  /* eslint no-param-reassign:0 */
  Container.displayName = `Form(${getDisplayName(WrappedComponent)})`;
  Container.WrappedComponent = WrappedComponent;
  // 使用hoist-non-react-statics库，复制所有静态方法，请查看：
  // https://github.com/mridgway/hoist-non-react-statics
  // https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  return hoistStatics(Container, WrappedComponent);
}

export function identity(obj) {
  return obj;
}

export function flattenArray(arr) {
  return Array.prototype.concat.apply([], arr);
}

export function treeTraverse(path = '', tree, isLeafNode, errorMessage, callback) {
  if (isLeafNode(path, tree)) {
    callback(path, tree);
  } else if (tree === undefined || tree === null) {
    // Do nothing
  } else if (Array.isArray(tree)) {
    tree.forEach((subTree, index) => treeTraverse(
      `${path}[${index}]`,
      subTree,
      isLeafNode,
      errorMessage,
      callback
    ));
  } else { // It's object and not a leaf node
    if (typeof tree !== 'object') {
      warning(false, errorMessage);
      return;
    }
    Object.keys(tree).forEach(subTreeKey => {
      const subTree = tree[subTreeKey];
      treeTraverse(
        `${path}${path ? '.' : ''}${subTreeKey}`,
        subTree,
        isLeafNode,
        errorMessage,
        callback
      );
    });
  }
}

export function flattenFields(maybeNestedFields, isLeafNode, errorMessage) {
  const fields = {};
  treeTraverse(undefined, maybeNestedFields, isLeafNode, errorMessage, (path, node) => {
    fields[path] = node;
  });
  return fields;
}

/**
 * 将validate、rules、validateTrigger三个参数配置的校验事件及规则，整理成统一的校验事件、规则
 * @param {Array<object>} validate 校验事件、规则
 * @param {string} validate[].trigger 校验事件
 * @param {object[]} validate[].rules 校验规则，参考async-validator，https://github.com/yiminghe/async-validator
 * @param {object[]} rules 校验规则，参考async-validator，https://github.com/yiminghe/async-validator
 * @param {string} validateTrigger 校验事件
 * @returns {Array<object>} validateRules 校验事件、规则
 * @returns {string[]} validateRules[].trigger 校验事件
 * @returns {object[]} validateRules[].rules 校验规则，参考async-validator，https://github.com/yiminghe/async-validator
 */
export function normalizeValidateRules(validate, rules, validateTrigger) {
  const validateRules = validate.map((item) => {
    const newItem = {
      ...item,
      trigger: item.trigger || [],
    };
    if (typeof newItem.trigger === 'string') {
      newItem.trigger = [newItem.trigger];
    }
    return newItem;
  });
  if (rules) {
    validateRules.push({
      trigger: validateTrigger ? [].concat(validateTrigger) : [],
      rules,
    });
  }
  return validateRules;
}

/**
 * 将validate、rules、validateTrigger三个参数配置的校验事件及规则，整理成统一的校验事件、规则
 * @param {Array<object>} validateRules 校验事件、规则
 * @param {string[]} validateRules[].trigger 校验事件
 * @param {object[]} validateRules[].rules 校验规则，参考async-validator，https://github.com/yiminghe/async-validator
 * @returns {Array<string>} 校验事件
 */
export function getValidateTriggers(validateRules) {
  return validateRules
    .filter(item => !!item.rules && item.rules.length)
    .map(item => item.trigger)
    .reduce((pre, curr) => pre.concat(curr), []);
}

// 判断表单项类型，获取表单数据，默认支持通过event.target.value或event.target.checked获取
export function getValueFromEvent(e) {
  // To support custom element
  if (!e || !e.target) {
    return e;
  }
  const {target} = e;
  return target.type === 'checkbox' ? target.checked : target.value;
}

// 将错误数据整理后返回，返回的是校验错误提示语的数组，格式为string[]
export function getErrorStrs(errors) {
  if (errors) {
    return errors.map((e) => {
      if (e && e.message) {
        return e.message;
      }
      return e;
    });
  }
  return errors;
}

export function getParams(ns, opt, cb) {
  let names = ns;
  let options = opt;
  let callback = cb;
  if (cb === undefined) {
    if (typeof names === 'function') {
      callback = names;
      options = {};
      names = undefined;
    } else if (Array.isArray(names)) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
    } else {
      callback = options;
      options = names || {};
      names = undefined;
    }
  }
  return {
    names,
    options,
    callback,
  };
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

export function hasRules(validate) {
  if (validate) {
    return validate.some((item) => {
      return item.rules && item.rules.length;
    });
  }
  return false;
}

export function startsWith(str, prefix) {
  return str.lastIndexOf(prefix, 0) === 0;
}
