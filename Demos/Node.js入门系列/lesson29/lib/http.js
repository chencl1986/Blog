// 引入创建服务器所需的模块
const http = require('http')
const url = require('url')
const querystring = require('querystring')
const zlib = require('zlib')
const fs = require('fs')
const { Form } = require('multiparty')

// 引入服务器配置
const {
  HTTP_PORT,
  HTTP_ROOT,
  HTTP_UPLOAD
} = require('../config')

// 引入路由模块的查找路由方法
const { findRouter } = require('./router')

const server = http.createServer((req, res) => {
  // 解析请求数据
  // 获取请求路径及query数据
  const method = req.method
  const {
    pathname,
    query
  } = url.parse(req.url, true)

  // 为res添加writeJson方法，统一处理返回前台的JSON数据为字符串
  res.writeJson = (json) => {
    res.setHeader('content-type', 'application/json')
    res.write(JSON.stringify(json))
  }

  // 处理POST请求
  if (method === 'POST') {
    // 根据请求头的content-type属性值，区分是普通POST请求，还是文件请求。
    // content-type为application/x-www-form-urlencoded时，表示是普通POST请求
    // 普通POST请求直接进行处理，文件请求使用multiparty处理
    if (req.headers['content-type'].startsWith('application/x-www-form-urlencoded')) {
      // 普通POST请求
      let arr = []  // 存储Buffer数据

      // 接收数据
      req.on('data', (buffer) => {
        arr.push(buffer)
      })

      // 数据接收完成
      req.on('end', () => {
        const data = Buffer.concat(arr)  // 合并接收到的数据
        const post = querystring.parse(data.toString()) // 将接收到的数据转换为JSON

        // 通过路由处理数据，因为此时是普通POST请求，不存在文件数据
        processData(method, pathname, query, post, {})
      })
    } else {
      // 文件POST请求
      const form = new Form({
        uploadDir: HTTP_UPLOAD  // 指定文件存储目录
      })

      // 处理请求数据
      form.parse(req)

      let post = {} // 存储数据参数
      let files = {}  // 存储文件数据

      // 通过field事件处理普通数据
      form.on('field', (name, value) => {
        post[name] = value
      })

      // 通过file时间处理文件数据
      form.on('file', (name, file) => {
        files[name] = file
      })

      // 处理错误
      form.on('error', (error) => {
        console.error(error)
      })

      // 数据传输完成时，触发close事件
      form.on('close', () => {
        // 通过路由处理数据，因为此时是POST文件请求，query、post、files数据都存在
        processData(method, pathname, query, post, files)
      })
    }
  } else {  // 处理GET请求
    // 通过路由处理数据，因为此时是GET请求，只有query数据
    processData(method, pathname, query, {}, {})
  }

  // 通过路由处理请求数据的公共方法
  async function processData(method, pathname, query, post, files) {
    const callback = findRouter(method, pathname)  // 获取处理请求的回调函数

    // 若回调函数存在，则表示路由有配置相应的数据处理，即该请求不是获取静态文件。
    if (callback) {
      try {
        // 根据路由处理接口数据
        await callback(res, query, post, files)
      } catch (error) {
        console.error(error)
        // 出现错误的处理
        res.writeHead(500)
        res.write('Internal Server Error')
        res.end()
      }
    } else {
      // 若回调函数不存在，则表示该请求为请求一个静态文件，如html、css、js等
      const filePath = HTTP_ROOT + pathname

      // 检查文件是否存在
      fs.stat(filePath, (error, stat) => {
        if (error) {
          // 出现错误表示文件不存在
          res.writeHead(404)
          res.write('Not Found')
          res.end()
        } else {
          // 文件存在则进行读取
          // 创建一个可读流。
          const readStream = fs.createReadStream(filePath)

          // 创建一个Gzip对象，用于将文件压缩成
          const gz = zlib.createGzip()

          // 向浏览器发送经过gzip压缩的文件，设置响应头，否则浏览器无法识别，会自动进行下载。
          res.setHeader('content-encoding', 'gzip')

          // 将读取的内容，通过gzip压缩之后，在通过管道推送到res中，由于res继承自Stream流，因此也可以接收管道的推送。
          readStream.pipe(gz).pipe(res)

          readStream.on('error', (error) => {
            console.error(error)
          })
        }
      })
    }
  }
})

// 监听配置的端口
server.listen(HTTP_PORT)
// 打印创建服务器成功信息
console.log(`Server started at ${HTTP_PORT}`)
