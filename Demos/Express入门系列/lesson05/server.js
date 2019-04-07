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
    // 设置Cookie有效期
    expires: new Date(new Date().getTime() + 14 * 86400000)
  })

  // 读取cookieParser解析的Cookie
  console.log(req.cookies)

  res.send('Cookie: ' + JSON.stringify(req.cookies))

  
})

server.use(express.static('./static/'))

console.log(`Server started at 8080`)
