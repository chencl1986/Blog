const router = new Router()

router.get('/detail', async (ctx, next) => {
  ctx.body = '社会新闻详情页'
})

module.exports = router.routes()