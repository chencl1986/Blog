const assert = require('assert')

const obj1 = {
  a: 1,
  b: 2,
  children: {
    c: 3
  }
}

const obj2 = {
  a: 1,
  b: 2,
  children: {
    c: 3
  }
}

const obj3 = {
  a: 1,
  b: 2,
  children: {
    c: '3'
  }
}

assert.deepStrictEqual(obj1, obj2, 'obj1 !== obj2')

assert.deepStrictEqual(obj1, obj3, 'obj1 !== obj3')
