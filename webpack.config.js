const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
process.env.NODE_ENV = 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: {
    app: './src/js/index.js',
    // print: './src/js/print.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']// 开发模式使用
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({// 生产模式使用
      //     fallback: 'style-loader',
      //     use: 'css-loader'
      //   })
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new ManifestPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      disable: false,// 生产模式为 true, 开发模式为 false, 因为使用这个插件会导致 css 热更新失败
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app',
      meta: [
        {
          name: 'description',
          content: 'A better default template for html-webpack-plugin.'
        }
      ],
      mobile: true,
      lang: 'zh-CN',
      title: 'My App',
    })
  ]
}