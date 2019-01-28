// 引入Nodejs自带的http模块
const http = require('http');
// 引入Nodejs自带的child_process模块
const childProcess = require('child_process');

const hostname = '127.0.0.1'; // 本机地址
const port = 3000; // 端口

// 创建一个服务器
const server = http.createServer((req, res) => {
  res.statusCode = 200; // 设置响应状态码
  res.setHeader('Content-Type', 'text/plain'); // 设置响应头
  res.end('Hello World\n'); // 向前台输出内容
});

// 开启监听
server.listen(port, hostname, () => {
  // 在命令行打印运行结果
  console.log(`Server running at http://${hostname}:${port}/`);
  // 使用默认浏览器打开地址
  childProcess.exec(`start http://${hostname}:${port}/`);
});