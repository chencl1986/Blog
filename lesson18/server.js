const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.headers.origin)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.write(`{"resultCode": "0000", "msg": "success"}`)
  res.end()
})

server.listen(8080)