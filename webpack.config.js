const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProd = process.NODE_ENV === 'production'

const conf = {
  mode: isProd ? 'production' : 'development',
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.template.html'),
      title: '学习 React SSR',
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 1234,
    historyApiFallback: true,
  },
}

module.exports = conf
