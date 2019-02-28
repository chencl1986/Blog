const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  let bufferArray = []  // 用于存储data事件获取的Buffer数据。

  req.on('data', (buffer) => {
    bufferArray.push(buffer)  // 将Buffer数据存储在数组中。
  })

  req.on('end', () => {
    // Buffer 类是一个全局变量，使用时无需 require('buffer').Buffer。
    // Buffer.concat方法用于合并Buffer数组。
    const buffer = Buffer.concat(bufferArray)
    // 已知Buffer数据只是字符串，则可以直接用toString将其转换成字符串。
    const post = querystring.parse(buffer.toString())
    console.log(post)
  })
})

server.listen(8080)