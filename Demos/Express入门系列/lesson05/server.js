const express = require('express')
const cookieParser = require('cookie-parser')

const server = express()

server.listen(8080)

// 解析Cookie
server.use(cookieParser(
  // 签名用密钥，需要保密
  'NpLRTpy1vbBzEw2JcAxpf970kOk2RViDn5wKwrMvXkQwIwVKp99dnwArFIOZZ8jBdrti01eaCi0GqmvwYrd7VCkyLuSeRwTHYDIpd9drB6wmdysjJmw1DYfiKTgF1wqdijao8ZoJBI8t8V6Yazk43DoFuh5eVNndFsIlRYZoeNlfvffVPzxlGgsNLt0DkN7VhLHVYz9sdCrGqEp0AINJMhgyiRyYy0WncUh1k7GlzkKz1mco5sN4ObHPfNahGQnq80QnvBly72sdHH2yMk4B3R8kdK7oIBvC6CadiPEy5d1OonCDflvW4MQGcm6u5BZNECBNoZrhn5lfWoy2YKzdubrgNFMvHgUwLVrEZIKW2nWIHjBBddExnLQWVo4kSToZeuyJ75GqvFGnqZqA7iokEcy0FmXMHODuOL2O5z2fluS19b55AMspVxWj8VHTBV2kra7InpbqUipu197oDkvi2RWIS7n1zNggHz6JEEaMbp35Kws1VQvG4nRJLaeE8gx32GoIRQkl22qZyI5UQVcItFmfhPUb1b5T1p1c9sF0e7YrZwHfahr1gwXGZxwDtTAtmRmZstHA5AOX5rccKxMsHyYahcE8Buylq7sBkTJrxpsUERKnKT4k157gz7HBggsX8g7y6YfxMCd7ThgR3qMtKWHtraz7xNmGwd4NWcmEmuKtMLrdMk5OXuYI9Kx3rNQBoKbU8WWMtpgzZI63LlEcLQAjqnx76HMyeqDHnF0zEo6whxF4qqDDwXmvjOFgtV7A4ol45J5B6DKohf2pl4g48egAcvNZ3PjqWnEMC4ccvXX0sRCoKl0TxVUpxOA5aEzSkEMpYHmfL3E2igO9K0we8aPrfOkBD4pMoZUGLP7xteA9P7fJwggZZl9okhUCZspR2Qb0CFlFJwWURhUmAFIDMxpq1KuMBpz6cg75pEhHFqHEvG2U722NdIjJzPSGAbXR5eZMmMKzCj0yBViln8FrtajkYHA3vaSC5tV3BjrkFtivCmc9Hlt5SJubuqBRRdAB'
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

server.use(express.static('./static/'))

console.log(`Server started at 8080`)
