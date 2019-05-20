const Router = require('koa-router')

const router = new Router()

router.get('/detail', async (ctx, next) => {
  ctx.body = '体育新闻详情页'
})

module.exports = router.routes()