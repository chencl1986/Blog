// 创建路由表
let router = {
  // 存储get请求的路由
  get: {

  },
  // 存储post请求的路由
  post: {

  }
}

// 添加路由的方法，method为请求方法，url为请求地址，callback为处理该请求的回调函数
function addRouter(method, url, callback) {
  // 为便于处理，将method和url统一转换成小写
  method = method.toLowerCase()
  url = url.toLowerCase()

  // 将处理请求的回调函数，按方法名和地址储存到路由表中
  router[method][url] = callback
}

// 查找处理请求的回调函数的方法，method为请求方法，url为请求地址，返回处理路由的回调函数
function findRouter(method, url) {
  // 为便于处理，将method和url统一转换成小写
  method = method.toLowerCase()
  url = url.toLowerCase()

  // 找到路由对应的回调函数，不存在则默认返回null
  const callback = router[method][url] || null

  // 将回调函数返回
  return callback
}

// 将添加路由和查找路由方法导出
module.exports = {
  addRouter,
  findRouter
}
