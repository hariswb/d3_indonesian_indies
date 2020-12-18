const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
      index: path.resolve(__dirname, "src/index.js")
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: '/d3_indonesian_indies/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist")
    },
    module:{
      rules: [
        {
          test:/\.css$/,
          use:["style-loader","css-loader"]
        },
        {
          test:/\.js$/,
          exclude:/node_modules/,
          use:["babel-loader"]
        },
        {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html")
      })
    ]
  }; 