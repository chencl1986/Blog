const path=require('path');

module.exports={
  mode: 'development',  // 开发模式
  entry: './src/vm.js', // 入口文件配置
  output: {
    path: path.resolve(__dirname, 'dest'),  // 输出文件夹
    filename: 'bundle.min.js' // 打包输出的文件名
  },
  module: {
    rules: [
      { // 处理CSS
        test: /\.css$/i, 
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
