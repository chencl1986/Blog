const express = require('express')
const bodyParser = require('body-parser')

const server = express()

server.listen(8080)

server.get('/reg', (req, res, next) => {
  console.log(req.query)
  res.send({
    error: 0,
    data: req.query,
    msg: '注册成功'
  })
})

// 处理表单提交，对应请求头application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({
  extended: false // 为true时将使用qs库处理数据，通常不需要
}))

// 处理fetch请求，对应请求头application/json
server.use(bodyParser.json())

server.post('/login', (req, res, next) => {
  console.log(req.body)
  res.send({
    error: 0,
    data: req.body,
    msg: '登陆成功'
  })
})

server.use(express.static('./static/'))

console.log(`Server started at 8080`)
