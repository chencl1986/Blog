const Router = require('koa-router')

const router = new Router()

router.get('/detail', async (ctx, next) => {
  ctx.body = '用户账户详情页'
})

module.exports = router.routes()