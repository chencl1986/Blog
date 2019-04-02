const express = require('express')

// 引入bodyParser中间件
const bodyParser = require('./libs/body-parser')

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

// 使用bodyParser中间件
server.use(bodyParser)

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
