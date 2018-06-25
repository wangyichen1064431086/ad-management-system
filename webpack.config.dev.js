const path = require('path');
const webpack = require('webpack');
const sassLoader = 'style-loader!css-loader?modules&importLoaders&localIdentName=[name]__[local]__[hash:base64:5]!sass-loader?sourceMap=true&sourceMapContents=true';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode:'development',
  devtool: 'cheap-module-eval-source-map',//This option controls if and how source maps are generated.
  // enhance debugging by adding meta info for the browser devtools(通过为浏览器devtools添加元信息来增强调试功能)

  entry: {
    app: ['./client/js/app.js','./client/scss/app.scss'],
    adForNews: ['./client/js/ad-subscription/adForNews.js','./client/scss/ad-subscription/adForNews.scss']
    //adForNews: ['./client/js/adForNews.js']
  },
  output: {
     // options related to how webpack emits results
    path: path.resolve(__dirname, '.tmp'),
    filename: '[name].js',
    publicPath: '/static/',
  },

  module: {
    rules: [{
      test:/\.jsx?$/,//匹配.js和.jsx结尾的文件
      include: [
        path.join(__dirname, 'client','js')
      ],
      loaders: ['babel-loader']//Rule.loaders is an alias to Rule.use.
    }, { //for react css module
      test: /\.scss$/,
      include: [
        //path.resolve(__dirname, 'client/scss'),
        path.resolve(__dirname, 'client/scss/components'),
        path.resolve(__dirname, 'node_modules')//不起作用
      ],
      loader: sassLoader
    },{// for normal scss
      resource: {
        test: /\.scss$/,
        or: [
          path.join(__dirname, 'client', 'scss','ad-subscription'),
          path.join(__dirname, 'client', 'scss','app.scss')
        ]
      },
      use: [ 
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },

  resolve: { 
    //Configure how modules are resolved.
    alias: {
      //Create aliases to import or require certain modules more easily. Eg: in app.js, "import React from '../node_modules/react';" can now be written as "import React from 'react"
      'react': path.join(__dirname,'node_modules','react'),
      'sass-mq': path.resolve(__dirname, 'node_modules/sass-mq')//没有用啊
    },
    extensions: [
      //Enables users to leave off the extension when importing.(省略引入文件的后缀)
      '.js', '.jsx','.scss','.css'
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename:'[name].css'
    })
  ]
}