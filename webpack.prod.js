const merge = require('webpack-merge');
const common = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({// 生产模式使用
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }]
      }
    ]
  },
  plugins: [
    new ManifestPlugin(),
    new UglifyJSPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      disable: false,// 生产模式为 true, 开发模式为 false, 因为使用这个插件会导致 css 热更新失败
    }),
  ]
})