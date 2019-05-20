const Router = require('koa-router')  // 引用koa-router

const router = new Router() // 创建一个路由

router.use('/social', require('./social'))  // 配置社会新闻模块的访问路由，并且引用社会新闻模块的路由配置
router.use('/sports', require('./sports'))  // 配置体育新闻模块的访问路由，并且引用体育新闻模块的路由配置

module.exports = router.routes()  // 导出路由配置
