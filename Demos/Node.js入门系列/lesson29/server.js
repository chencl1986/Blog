const connection = require('./lib/database')
const http = require('./lib/http')

const {
  addRouter
} = require('./lib/router')

// 添加获取商品列表接口
addRouter('get', '/list', async (res, query, post, files) => {
  try {
    // 查询商品列表
    const data = await connection.query(`SELECT * FROM item_table`)

    res.writeJson({
      error: 0,
      data
    })
  } catch (error) {
    console.error(error)
    res.writeJson({
      error: 1,
      msg: '数据库出错'
    })
  }
  res.end()
})

// 添加商品接口
addRouter('post', '/add', async (res, query, post, files) => {
  let {
    title,
    price,
    count
  } = post

  // 判断是否有传参
  if (!title || !price || !count) {
    res.writeJson({
      error: 1,
      msg: '参数不合法'
    })
  } else {
    // 将价格和数量转为数字
    price = Number(price)
    count = Number(count)

    // 判断价格和数量是否非数字
    if (isNaN(price) || isNaN(count)) {
      res.writeJson({
        error: 1,
        msg: '参数不合法'
      })
    } else {
      try {
        /* 
      应禁止query语句使用如下写法，容易造成注入攻击。
      connection.query(`INSERT INTO item_table (title, price, count) VALUES('${title}, ${price} ${count}')`)
      此时若用户传入参数如下：
      http://localhost:8080/add?title=a')%3B%20DELETE%20FROM%20item_table%3B%20SELECT%20(1&price=19.8&count=200
      就会让服务器执行一个这样的语句：
      INSERT INTO item_table (title, price, count) VALUES('a'); DELETE FROM item_table; SELECT ('1', 19.8, 200)
      其意义为：
      1. 插入一个虚假数据
      2. 删除item_table表中所有数据
      3. 返回一个虚假数据
      */

        // 使用占位符?代替需要插入数据库的参数，第二个数组参数中的3个值会按顺序填充占位符，该方法可以避免大部分注入攻击。
        await connection.query(`INSERT INTO item_table (title, price, count) VALUES(?,?,?)`, [title, price, count])

        res.writeJson({
          error: 0,
          msg: '添加商品成功'
        })
      } catch (error) {
        console.error(error)
        res.writeJson({
          error: 1,
          msg: '数据库内部错误'
        })
      }
    }
  }
  res.end()
})

addRouter('get', '/del', async (res, query, post, files) => {
  const ID = query.id

  if (!ID) {
    res.writeJson({
      error: 1,
      msg: '参数不合法'
    })
  } else {
    await connection.query(`DELETE FROM item_table WHERE ID=${ID}`)

    res.writeJson({
      error: 0,
      msg: '删除成功'
    })
  }
  res.end()
})
