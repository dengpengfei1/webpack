const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
process.env.NODE_ENV = 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: {
    app: './src/js/index.js',
    print: './src/js/print.js'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
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
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new ManifestPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
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