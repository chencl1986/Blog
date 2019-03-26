const connection = require('./lib/database')

;(async () => {
  // 查询item_table表中的数据
  const response = await connection.query(`SELECT * FROM item_table`)
  console.log(response)
})()
