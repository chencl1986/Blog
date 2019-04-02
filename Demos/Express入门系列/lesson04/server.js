const express = require('express')
const bodyParser = require('body-parser')

const server = express()

server.listen(8080)

// 引入Multer
const multer = require('multer')

// 设置保存上传文件路径
const upload = multer({
  dest: './static/upload'
})

// 处理上传文件
server.use(upload.any())

// 处理表单提交，对应请求头application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({
  extended: false // 为true时将使用qs库处理数据，通常不需要
}))

// 接收文件上传结果
server.post('/upload', (req, res, next) => {
  console.log(req.body)
  console.log(req.files)
  res.send({
    error: 0,
    data: req.body,
    msg: '上传成功'
  })
})

server.use(express.static('./static/'))

console.log(`Server started at 8080`)
