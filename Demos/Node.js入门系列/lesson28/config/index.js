const process = require('process')

const mode = process.env.OS === 'Windows_NT' ? 'env' : 'prod'

module.exports = {
  mode, // 当前所处环境
  ...(mode === 'env' ? require('./config.dev') : require('./config.prod'))  // 当前环境的配置
}
