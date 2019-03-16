const http = require('http')
const url = require('url')
const fs = require('fs')
const mysql = require('mysql')

// 1. 连接服务器
const connection = mysql.createPool({
  connectionLimit: 10,  // 建立的连接数量，默认为10个
  host: 'localhost',  // 地址
  port: 3306,  // 端口，不传则默认3306
  user: 'root',  // 登录名
  password: '',  // 密码
  database: 'test'  // 连接的数据库
})

/* const username = 'lily'
const password = '888888'

// 向数据库中插入数据
connection.query(`INSERT INTO user_table (username, password) VALUES ('${username}', '${password}')`, (err, data) => {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
})

// 查询user_table表的数据
connection.query(`SELECT * FROM User_table`, (err, data) => {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
}) */

// 2. 与HTTP模块配合使用
const server = http.createServer((req, res) => {
  const {
    pathname,
    query
  } = url.parse(req.url, true)

  if (pathname === '/reg') {
    // 获取get请求数据
    const {
      username,
      password
    } = query

    // 校验参数是否正确
    if (!username || !password) {
      res.write(JSON.stringify({
        error: 1,
        msg: '用户名或密码不可为空'
      }))
      res.end()
    } else if (username.length > 32) {
      res.write(JSON.stringify({
        error: 1,
        msg: '用户名的长度不可超过32位'
      }))
      res.end()
    } else if (password.length > 32) {
      res.write(JSON.stringify({
        error: 1,
        msg: '密码的长度不可超过32位'
      }))
    } else {  // 校验通过，开始注册流程
      // 检查用户名是否已存在
      connection.query(`SELECT ID FROM User_table WHERE username='${username}'`, (err, data) => {
        if (err) {
          res.writeHead(500)
          res.end()
        } else {
          if (data.length) {
            res.write(JSON.stringify({
              error: 1,
              msg: '此用户名已被占用'
            }))
            res.end()
          } else {
            // 将用户名和密码插入数据库
            connection.query(`INSERT INTO user_table (username, password) VALUES('${username}', '${password}')`, (err, data) => {
              if (err) {
                res.writeHead(500)
                res.end()
              } else {
                res.write(JSON.stringify({
                  error: 0,
                  msg: '注册成功'
                }))
                res.end()
              }
            })
          }
        }
      })
    }

  } else if (pathname === '/login') {
    let arr = []

    req.on('data', (buffer) => {
      // 获取POST请求的Buffer数据
      arr.push(buffer)
    })

    req.on('end', () => {
      // 将Buffer数据合并
      let buffer = Buffer.concat(arr)

      // 处理接收到的POST数据
      const post = JSON.parse(buffer.toString())

      // 获取post请求数据
      const {
        username,
        password
      } = post

      // 根据用户名查询
      connection.query(`SELECT username, password FROM User_table WHERE username='${username}'`, (err, data) => {
        if (err) {
          console.error(err)
        } else {
          if (!data.length) {
            // 用户不存在
            res.write(JSON.stringify({
              error: 1,
              msg: '用户名或密码错误'
            }))
            res.end()
          } else if (data[0].password !== password) {
            // 密码不正确
            res.write(JSON.stringify({
              error: 1,
              msg: '用户名或密码错误'
            }))
            res.end()
          } else {
            res.write(JSON.stringify({
              error: 0,
              msg: '登录成功'
            }))
            res.end()
          }
        }
      })
    })
  } else {
    // 若请求不为接口，则默认为请求文件
    fs.readFile(`.${pathname}`, (err, buffer) => {
      if (err) {
        res.writeHead(404)
        res.write(buffer)
      } else {
        res.write(buffer)
      }
      res.end()
    })
  }
})

server.listen(8080)
