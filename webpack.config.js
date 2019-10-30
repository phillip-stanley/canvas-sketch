const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development', // development || production
  context: __dirname,
  // entry points for webpack
  entry: {
    index: `${APP_DIR}/index.js`,
  },
  devServer: {
    compress: true,
    port: 8080,
    hot: true
  },
  // output path and file name for bundled code.
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    publicPath: '/dist/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
