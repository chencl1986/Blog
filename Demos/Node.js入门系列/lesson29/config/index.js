const process = require('process')

// 可以通过开发环境和生产环境系统等参数差异，判断处于哪个环境。
// const mode = process.env.OS === 'Windows_NT' ? 'env' : 'prod'

// 也可以通过package.json中配置的启动命令判断处于开发还是生产环境。
const mode = process.argv[2] === '--dev' ? 'env' : 'prod'

module.exports = {
  mode, // 当前所处环境
  ...(mode === 'env' ? require('./config.dev') : require('./config.prod'))  // 当前环境的配置
}
