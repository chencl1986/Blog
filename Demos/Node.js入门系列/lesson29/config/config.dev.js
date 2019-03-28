const path = require('path')

module.exports = {
  // 数据库配置
  DB_HOST: 'localhost',
  DB_PORT: 3306,
  DB_USER: 'root',
  DB_PASS: '',
  DB_NAME: 'test',

  // HTTP端口
  HTTP_PORT: 8080,
  // 静态文件绝对路径
  HTTP_ROOT: path.resolve(__dirname, '../static/'),
  // 上传文件保存绝对路径
  HTTP_UPLOAD: path.resolve(__dirname, '../static/upload')
}