const express = require('express')
const cookieParser = require('cookie-parser')

const server = express()

server.listen(8080)

console.log(`Server started at 8080`)

// 解析Cookie
server.use(cookieParser(
  // 签名用密钥，需要保密
  'NpLRTpy1vbBzEw2JcAxpf970kOk2RViDn5wKwrMv'
))

server.get('/cookie', (req, res, next) => {
  // express自带的设置Cookie方法
  res.cookie('userName', 'lee', {
    // 设置该Cookie只可以由服务端访问，即前端JavaScript无法访问document.cookie获取该值，但控制台还是可以查看和修改
    httpOnly: true,
    // 只有通过HTTPS请求的Cookie才被使用，否则都认为是错误的Cookie
    // secure: true,
    // 设置保存Cookie的域名，浏览器查找Cookie时，子域名（如translate.google.com）可以访问主域名（google.com）下的Cookie，而主域名（google.com）不可以访问子域名（如translate.google.com）下的Cookie
    // 本地测试可直接设置为localhost
    domain: 'localhost',
    // 设置保存Cookie的路径，浏览器查找Cookie时，子路径（如/map）可以访问根路径（'/'）下设置的Cookie，而根路径（'/'）无法访问子路径（如/map）下设置的Cookie
    path: '/',
    // 通过expires设置Cookie过期时间为14天后
    // expires: new Date(new Date().getTime() + 14 * 86400000),
    // 通过maxAge设置Cookie过期时间为14天后
    maxAge: 14 * 86400000,
  })

  res.cookie('password', 'test123', {
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    maxAge: 14 * 86400000,
    // 开启该Cookie的签名模式
    signed: true
  })

  // 读取cookieParser解析的Cookie
  console.log(`cookies: ${JSON.stringify(req.cookies)}`)

  // 经过签名的Cookie
  console.log(`signedCookies: ${JSON.stringify(req.signedCookies)}`)

  res.send(`cookies: ${JSON.stringify(req.cookies)}. signedCookies: ${JSON.stringify(req.signedCookies)}`)
})
