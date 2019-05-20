const Router = require('koa-router')  // 引用koa-router

const router = new Router() // 创建一个路由

// 配置访问新闻详情页的路由地址，并配置返回数据
router.get('/detail', async (ctx, next) => {
  ctx.body = '社会新闻详情页'
})

module.exports = router.routes()  // 导出路由配置
