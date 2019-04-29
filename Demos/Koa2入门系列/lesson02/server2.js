const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()  // 使用new创建一个app

app.listen(8080) // 监听8080端口

console.log(`app started at http://localhost:8080`)

const router = new Router() // 创建路由

// 配置嵌套路由

// 主路由

const newsRouter = new Router()
const sportNewsRouter = new Router()
sportNewsRouter.get('/detail', async (ctx, next) => {
  ctx.body = '体育新闻详情页'
})
const socialNewsRouter = new Router()
socialNewsRouter.get('/detail', async (ctx, next) => {
  ctx.body = '社会新闻详情页'
})
newsRouter.use('/sports', sportNewsRouter.routes())
newsRouter.use('/social', socialNewsRouter.routes())

const userRouter = new Router()
const accountUserRouter = new Router()
accountUserRouter.get('/detail', async (ctx, next) => {
  ctx.body = '用户账户详情页'
})
const infoUserRouter = new Router()
infoUserRouter.get('/detail', async (ctx, next) => {
  ctx.body = '用户信息详情页'
})
userRouter.use('/account', accountUserRouter.routes())
userRouter.use('/info', infoUserRouter.routes())

router.use('/news', newsRouter.routes())
router.use('/user', userRouter.routes())

// 使用路由中间件
app.use(router.routes())
