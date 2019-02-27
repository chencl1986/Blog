const http = require('http')
const url = require('url')
const { URL } = url
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  {
    // 方法一：
    const [ pathname, queryStr ] = req.url.split('?')
    const query = querystring.parse(queryStr)
    console.log(pathname, query)
  }
  {
    // 方法二：
    const url = new URL(`http://localhost:8080${req.url}`)
    const { pathname, search } = url
    const query = querystring.parse(search.substring(1, url.search.length))
    console.log(pathname, query)
  }
  {
    // 方法三：
    // parse方法第二个参数若传true，则会直接将解析出的query值转为对象形式，否则它只是字符串形式
    const { pathname, query } = url.parse(req.url, true)
    console.log(pathname, query)
  }
})

server.listen(8080)