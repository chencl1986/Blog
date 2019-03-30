const {
  addRouter
} = require('../lib/router')

// 添加获取商品列表接口
addRouter('get', '/list', require('./list'))

// 添加商品接口
addRouter('post', '/add', require('./add'))

// 删除商品接口
addRouter('get', '/del', require('./del'))