const path=require('path');

module.exports=function (env, argv){
  env=env||{};

  return {
    entry: './src/index',
    module: {
      rules: [
        {test: /\.css$/i, use: ['vue-style-loader', 'css-loader']},
        {test: /\.(eot|svg|ttf|woff|woff2)$/i, use: 'file-loader'},
        {test: /\.vue$/i, use: 'vue-loader'},
        {test: /\.less$/i, use: ['vue-style-loader', 'css-loader', 'less-loader']}
      ]
    },
    resolve: {
      alias: {
        'vue': 'vue/dist/vue.esm',
        '@': path.resolve(__dirname, 'src/components')
      }
    },
    ...env.development?require('./config/webpack.development'):require('./config/webpack.production')
  };
};
