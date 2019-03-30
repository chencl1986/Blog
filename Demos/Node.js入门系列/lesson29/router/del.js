const connection = require('../lib/database')

module.exports = async (res, query, post, files) => {
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
}