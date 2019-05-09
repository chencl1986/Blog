const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()  // 使用new创建一个app

app.listen(8080) // 监听8080端口

console.log(`app started at http://localhost:8080`)

const router = new Router() // 创建路由

// 使用路由中间件
app.use(require('./router'))
