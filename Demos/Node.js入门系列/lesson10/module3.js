module.exports = {
  a: 1,
  b: 2
}

module.exports = 123

module.exports = {
  a: 1,
  b: 2,
  c: 3
}

module.exports = function () {
  console.log('test')
}

module.exports = class {
  constructor(name) {
    this.name = name
  }

  show() {
    console.log(`Show ${this.name}`)
  }
}
