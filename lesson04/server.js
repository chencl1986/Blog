const http = require('http')
const fs = require('fs')

const server = http.createServer((request, response) => {
  console.log(request.url)  // 在request对象中，可以获取请求的URL，通过URL判断请求的资源。
  fs.readFile(`./www${request.url}`, (error, buffer) => { // 根据URL查找读取相应的文件。
    if (error) {  // 若读取错误，则向前端返回404状态码，以及内容Not Found。
      response.writeHead(404)
      response.write('Not Found')
    } else {  // 若读取成功，则向前端返回读取到的文件。
      response.write(buffer)
    }
    response.end()  // 关闭连接。
  })
})

server.listen(8080)