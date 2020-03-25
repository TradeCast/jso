// @flow
const path = require('path')

module.exports = {
  entry: ["@babel/polyfill", "./src/JSO.js"],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jso.js',
    library: 'jso',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
}
