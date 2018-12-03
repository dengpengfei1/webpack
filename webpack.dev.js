const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']// 开发模式使用
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: '127.0.0.2',
    port: 9000,
    hot: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
})