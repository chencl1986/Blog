const Koa = require('koa')

const server = new Koa()  // 使用new创建一个Server

server.use(async (ctx, next) => {
  ctx.body = 'Hello World'  // 打印Hello World到前端
})

server.listen(8080) // 监听8080端口

console.log(`Server started at http://localhost:8080`)
