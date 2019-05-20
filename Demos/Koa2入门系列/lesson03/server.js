const Koa = require('koa')

const app = new Koa()  // 创建一个服务器

app.listen(8080) // 监听8080端口

console.log(`app started at http://localhost:8080`)

app.use(require('./router'))  // 使用路由中间件
