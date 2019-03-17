const path=require('path');

module.exports={
  mode: 'development',
  entry: './src/vm.js',
  output: {
    path: path.resolve(__dirname, 'dest'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.css$/i, use: ['style-loader', 'css-loader']},
      {test: /\.(eot|svg|ttf|woff|woff2)$/i, use: 'file-loader'}
    ]
  }
};
