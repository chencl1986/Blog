const http = require('http')
const zlib = require('zlib')
const url = require('url')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const {
    pathname
  } = url.parse(req.url, true)

  // 文件的相对路径
  const filepath = `./${pathname}`

  // 检查文件是否存在
  fs.stat(filepath, (error, stat) => {
    if (error) {
      console.error(error);
      res.setHeader('content-encoding', 'identity')
      res.writeHead(404)
      res.write('Not Found')
      res.end()
    } else {
      // 创建一个可读流。
      const readStream = fs.createReadStream(filepath)

      // 创建一个Gzip对象，用于将文件压缩成.gz文件
      const gzip = zlib.createGzip()

      // 向浏览器发送经过gzip压缩的文件，设置响应头，否则浏览器无法识别，会自动进行下载。
      res.setHeader('content-encoding', 'gzip')
      // 将读取的内容，通过gzip压缩之后，在通过管道推送到res中，由于res继承自Stream流，因此也可以接收管道的推送。
      readStream.pipe(gzip).pipe(res)

      // 处理可读流报错，防止文件中途被删除或出错，导致报错。
      readStream.on('error', (error) => {
        console.error(error);
        res.setHeader('content-encoding', 'identity')
        res.writeHead(404)
        res.write('Not Found')
        res.end()
      })
    }
  })
})

server.listen(8080)
