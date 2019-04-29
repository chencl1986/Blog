const http = require('http')
const url = require('url')
const fs = require('fs')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  // 定义公共变量，存储请求方法、路径、数据
  const method = req.method
  let path = ''
  let get = {}
  let post = {}

  // 判断请求方法为GET还是POST，区分处理数据
  if (method === 'GET') {
    // 使用url.parse解析get数据
    const { pathname, query } = url.parse(req.url, true)

    path = pathname
    get = query

    complete()
  } else if (method === 'POST') {
    path = req.url
    let arr = []

    req.on('data', (buffer) => {
      // 获取POST请求的Buffer数据
      arr.push(buffer)
    })

    req.on('end', () => {
      // 将Buffer数据合并
      let buffer = Buffer.concat(arr)

      // 处理接收到的POST数据
      post = JSON.parse(buffer.toString())

      complete()
    })
  }

  // 在回调函数中统一处理解析后的数据
  function complete() {
    try {
      if (path === '/reg') {
        // 获取get请求数据
        const {
          username,
          password
        } = get

        // 读取user.json文件
        fs.readFile('./users.json', (error, data) => {
          if (error) {
            res.writeHead(404)
            res.end()
          } else {
            // 读取用户数据
            const users = JSON.parse(data.toString())
            const usernameIndex = users.findIndex((item) => {
              return username === item.username
            })

            // 判断用户名是否存在
            if (usernameIndex >= 0) {
              res.write(JSON.stringify({
                error: 1,
                msg: '此用户名已存在'
              }))
              res.end()
            } else {
              // 用户名不存在则在用户列表中增加一个用户
              users.push({
                username,
                password
              })

              // 将新的用户列表保存到user.json文件中
              fs.writeFile('./users.json', JSON.stringify(users), (error) => {
                if (error) {
                  res.writeHead(404)
                } else {
                  res.write(JSON.stringify({
                    error: 0,
                    msg: '注册成功'
                  }))
                }
                res.end()
              })
            }
          }
        })
      } else if (path === '/login') {
        const {
          username,
          password
        } = post

        // 读取users.json
        fs.readFile('./users.json', (error, data) => {
          if (error) {
            res.writeHead(404)
          } else {
            // 获取user列表数据
            const users = JSON.parse(data.toString())
            const usernameIndex = users.findIndex((item) => {
              return username === item.username
            })

            if (usernameIndex >= 0) {
              // 用户名存在，则校验密码是否正确
              if (users[usernameIndex].password === password) {
                res.write(JSON.stringify({
                  error: 0,
                  msg: '登录成功'
                }))
              } else {
                res.write(JSON.stringify({
                  error: 1,
                  msg: '密码错误'
                }))
              }
            } else {
              res.write(JSON.stringify({
                error: 1,
                msg: '该用户不存在'
              }))
            }
          }
          res.end()
        })
      } else {
        // 若不是注册或登录接口，则直接返回相应文件
        if (path !== '/favicon.ico') {
          fs.readFile(`.${path}`, (error, data) => {
            if (error) {
              res.writeHead(404)
            } else {
              res.write(data)
            }
            res.end()
          })
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
})

server.listen(8080)

console.log(`Server started at http://localhost:8080`)
