const express = require('express')
const cookieSession = require('cookie-session')

const server = express()

server.listen(8080)

console.log(`Server started at 8080`)

server.use(cookieSession({
  // 循环密钥，其中有若干个密钥。如果只有一个密钥，容易被客户端破解，多个密钥相对安全
  keys: [
    'tVnVq4zDhDtQPGPrx2qSOSdmuYI24C',
    'IUTEaA1wKoWnVDf4DspSBAjKvLWcyn',
    'yC7cWHZDYoRMYawxSVDdzKQdXkZ9sE',
    'Ikjk6OibzaBYiEM13Mrj8ITdb3DonG',
    'uyajLZWgim4BS4SuQtH4kbTi640mWo',
  ],
  // 设置20分钟有效期，若Session丢失，过期后将无法再被使用
  maxAge: 20 * 60 * 1000
}))

// 在接口中操作Session
server.get('/session', (req, res, next) => {
  console.log(`Session: ${JSON.stringify(req.session)}`)

  // 每次访问/session接口，就将Session中的number值加1
  if (req.session.number) {
    req.session.number++
  } else {
    req.session.number = 1
  }

  // 存储用户ID
  req.session.id = 'lee'

  res.send(`Session: ${JSON.stringify(req.session)}`)
})
