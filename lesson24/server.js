const http = require('http')
const url = require('url')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const {
    pathname
  } = url.parse(req.url, true)

  // 创建一个可读流。
  const readStream = fs.createReadStream(`./${pathname}`)

  // 将读取的内容，在通过管道推送到res中，该方法不经过压缩
  readStream.pipe(res)

  // 处理可读流报错，防止请求不存在的文件
  readStream.on('error', (error) => {
    console.error(error);
    res.writeHead(404)
    res.write('Not Found')
    res.end()
  })
})

server.listen(8080)
