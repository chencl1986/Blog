const connection = require('../lib/database')

module.exports = async (res, query, post, files) => {
  try {
    // 查询商品列表
    const data = await connection.query(`SELECT * FROM item_table`)

    res.writeJson({
      error: 0, // error为0则表示接口正常
      data  // 查询到的商品列表数据
    })
  } catch (error) {
    console.error(error)
    res.writeJson({
      error: 1, // error为1则表示接口出错
      msg: '数据库出错' // 接口的错误信息
    })
  }
  res.end()
}