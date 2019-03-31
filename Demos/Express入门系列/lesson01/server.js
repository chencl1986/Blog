const express = require('express')

const server = express()

server.listen(8080)

server.use((req, res, next) => {
  console.log('request')
  next()
})

server.use('/first', (req, res, next) => {
  console.log('first')
  next()
})

server.get('/first', (req, res, next) => {
  res.send({
    error: 0,
    msg: '请求成功'
  })
})

server.get('/second', (req, res, next) => {
  if (Number(req.query.num) > 10) {
    // 满足条件时，才可触发同名的下一个路由。
    req.randomNum = Math.floor(Math.random() * 100)
    next()
  } else {
    res.send({
      error: 1,
      msg: '请输入大于10的数字'
    })
  }
})

server.get('/second', (req, res, next) => {
  res.send({
    error: 0,
    msg: `输入成功，接收到的随机数为${req.randomNum}`
  })
})

console.log(`Server started at 8080`)
