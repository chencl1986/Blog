const http = require('http')
const multiparty = require('multiparty')

const server = http.createServer((req, res) => {
  const form = new multiparty.Form({
    uploadDir: './upload' // 指定文件存储目录
  })

  form.parse(req) // 将请求参数传入，multiparty会进行相应处理

  form.on('field', (name, value) => { // 接收到数据参数时，触发field事件
    console.log(name, value)
  })

  form.on('file', (name, file, ...rest) => { // 接收到文件参数时，触发file事件
    console.log(name, file)
  })

  form.on('close', () => {  // 表单数据解析完成，触发close事件
    console.log('表单数据解析完成')
  })
})

server.listen(8080)
