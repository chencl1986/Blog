// 引入Nodejs自带的http模块
const http = require('http');
// 引入Nodejs自带的child_process模块
const childProcess = require('child_process');

const hostname = '127.0.0.1'; // 本机地址
const port = 8080; // 端口

// 创建一个服务器
const server = http.createServer((request, response) => {
  response.statusCode = 200; // 设置响应状态码
  response.setHeader('Content-Type', 'text/plain'); // 设置响应头
  response.write('a')
  response.write('b')
  response.write('c')
  response.end('d') // 向前台输出内容
});

// 开启监听
server.listen(port, hostname, () => {
  // 在命令行打印运行结果
  console.log(`Server running at http://${hostname}:${port}/`);
  // 使用默认浏览器打开地址
  childProcess.exec(`start http://${hostname}:${port}/`);
});
