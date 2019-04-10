const process = require('process')
let mode = ''

// 可以通过开发环境和生产环境系统等参数差异，判断处于哪个环境。
// mode = process.env.OS === 'Windows_NT' ? 'dev' : 'prod'

// 也可以通过package.json中配置的启动命令判断处于开发还是生产环境。
// mode = process.argv[2] === '--dev' ? 'dev' : 'prod'

// 通过pm2启动项目，直接传入mode
// pm2 start ecosystem.config.js --watch --env production 为生产环境启动命令
console.log(process.env.NODE_ENV)
mode = process.env.NODE_ENV

module.exports = {
  mode, // 当前所处环境
  ...(mode === 'dev' ? require('./config.dev') : require('./config.prod'))  // 当前环境的配置
}
