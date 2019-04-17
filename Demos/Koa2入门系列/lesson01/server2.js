const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next(); // 先运行下一级中间件
  console.log('Third');  // 下级中间件都运行完成后，才执行此处代码
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);  // 打印下一级中间件中设置的响应头
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  console.log('Second');
  console.log(ctx.body); // 打印第三个中间件中赋值的ctx.body
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);  // 设置响应头
});

// response

app.use(async ctx => {
  console.log('First');
  ctx.body = 'Hello World'; // 赋值返回前台的数据
});

app.listen(8080);

console.log(`Server started at http://localhost:8080`);
