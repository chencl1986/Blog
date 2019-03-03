const assert = require('assert')

const arr1 = [{
  a: 1,
  b: 2,
  children: [{
    c: 3
  }]
}]

const arr2 = [{
  a: 1,
  b: 2,
  children: [{
    c: 3
  }]
}]

const arr3 = [{
  a: 1,
  b: 2,
  children: [{
    c: '3'
  }]
}]

assert.deepStrictEqual(arr1, arr2, 'arr1 !== arr2')

assert.deepStrictEqual(arr1, arr3, 'arr1 !== arr3')
