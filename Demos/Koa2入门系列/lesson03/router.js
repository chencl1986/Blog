const Router = require('koa-router')  // 引用koa-router

const router = new Router() // 创建一个路由

router.use('/news', require('./news'))  // 配置新闻模块的访问路由，并引用新闻模块路由配置
router.use('/user', require('./user'))  // 配置用户模块的访问路由，并引用用户模块路由配置

module.exports = router.routes()  // 导出路由配置
