module.exports = {
  // 数据库配置
  DB_HOST: '11.11.11.11',
  DB_PORT: 3306,
  DB_USER: 'root',
  DB_PASS: '123456',
  DB_NAME: 'company',

  // HTTP端口
  HTTP_PORT: 8080,
  // 静态文件绝对路径
  HTTP_ROOT: path.resolve(__dirname, '../static/'),
  // 上传文件保存绝对路径
  HTTP_UPLOAD: path.resolve(__dirname, '../static/upload')
}