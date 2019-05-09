const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()  // 使用new创建一个app

app.listen(8080) // 监听8080端口

console.log(`app started at http://localhost:8080`)

// 创建主路由
const router = new Router()

// 配置嵌套路由

// 创建新闻路由
const newsRouter = new Router()

// 创建社会新闻路由
const socialNewsRouter = new Router()
// 配置访问社会新闻详情页的地址，以及向前台返回的数据
socialNewsRouter.get('/detail', async (ctx, next) => {
  ctx.body = '社会新闻详情页'
})
// 配置社会新闻路由的访问路径，并将配置好的社会新闻路由应用到新闻路由中，实现由/social/detail路由，访问到社会新闻详情页的功能
newsRouter.use('/social', socialNewsRouter.routes())

const sportNewsRouter = new Router()
sportNewsRouter.get('/detail', async (ctx, next) => {
  ctx.body = '体育新闻详情页'
})
newsRouter.use('/sports', sportNewsRouter.routes())

// 配置新闻路由的访问路径，并将配置好的新闻路由应用到主路由中，实现由/news/social/detail路由，访问到社会新闻详情页的功能
router.use('/news', newsRouter.routes())

const userRouter = new Router()

const accountUserRouter = new Router()
accountUserRouter.get('/detail', async (ctx, next) => {
  ctx.body = '用户账户详情页'
})
userRouter.use('/account', accountUserRouter.routes())

const infoUserRouter = new Router()
infoUserRouter.get('/detail', async (ctx, next) => {
  ctx.body = '用户信息详情页'
})
userRouter.use('/info', infoUserRouter.routes())

router.use('/user', userRouter.routes())

// 使用路由中间件，完成嵌套路由配置
app.use(router.routes())
