const http = require('http')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  // 定义公共变量，存储请求方法、路径、数据
  const method = req.method
  let path = ''
  let get = {}
  let post = {}

  // 判断请求方法为GET还是POST，区分处理数据
  if (method === 'GET') {
    // 使用url.parse解析get数据
    const { pathname, query } = url.parse(req.url, true)

    path = pathname
    get = query

    complete()
  } else if (method === 'POST') {
    path = req.url
    let arr = []

    req.on('data', (buffer) => {
      // 获取POST请求的Buffer数据
      arr.push(buffer)
    })

    req.on('end', () => {
      // 将Buffer数据合并
      let buffer = Buffer.concat(arr)

      // 处理接收到的POST数据
      post = querystring.parse(buffer.toString())

      complete()
    })
  }

  // 在回调函数中统一处理解析后的数据
  function complete() {
    console.log(method, path, get, post)
  }
})

server.listen(8080)