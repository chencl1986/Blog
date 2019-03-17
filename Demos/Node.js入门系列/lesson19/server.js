const http = require('http')
const io = require('socket.io')

// 1. 建立HTTP服务器。
const server = http.createServer((req, res) => {

})

server.listen(8080)

// 2. 建立WebSocket，让socket.io监听HTTP服务器，一旦发现是WebSocket请求，则会自动进行处理。
const ws = io.listen(server)

// 建立连接完成后，触发connection事件。
// 该事件会返回一个socket对象（https://socket.io/docs/server-api/#Socket），可以利用socket对象进行发送、接收数据操作。
ws.on('connection', (socket) => {
  // 根据事件名，向客户端发送数据，数据数量不限。
  socket.emit('msg', '服务端向客户端发送数据第一条', '服务端向客户端发送数据第二条')

  // 根据事件名接收客户端返回的数据
  socket.on('msg', (...msgs) => {
    console.log(msgs)
  })

  // 使用计时器向客户端发送数据
  setInterval(() => {
    socket.emit('timer', new Date().getTime())
  }, 500);
})
