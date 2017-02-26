const path = require('path')
const cssnano = require('cssnano')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'
const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    app: [
      './src/index'
    ],
    vendor: [
      'react'
    ]
  },

  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx', '.json']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name].[chunkhash].js`,
    publicPath: `https://eventercom-redux.herokuapp.com/dist/`
  },

  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': IS_DEV,
      '__MAPBOX_KEY__': JSON.stringify(process.env.MAPBOX_KEY || '')
    }),
    new HtmlWebpackPlugin({
      template: `!!handlebars!${path.join(__dirname, 'src/index.hbs')}`,
      hash     : false,
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        collapseWhitespace : true
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  sassLoader: {
    includePaths : path.join(__dirname, 'src/styles')
  },

  postcss: [
    cssnano({
      autoprefixer : {
        add      : true,
        remove   : true,
        browsers : ['last 2 versions']
      },
      discardComments : {
        removeAll : true
      },
      discardUnused : false,
      mergeIdents   : false,
      reduceIdents  : false,
      safe          : true,
      sourcemap     : true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test    : /\.scss$/,
        exclude : null,
        loaders : [
          'style',
          BASE_CSS_LOADER,
          'postcss',
          'sass?sourceMap'
        ]
      },
      {
        test    : /\.css$/,
        exclude : null,
        loaders : [
          'style',
          BASE_CSS_LOADER,
          'postcss'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=8192'
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.handlebars$/, loader: "handlebars-loader"
      }
    ]
  }
}
