const webpack = require('webpack');
const devConfig = require('./dev.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postcssReporter = require('postcss-reporter');
const postcssEasyImport = require('postcss-easy-import');
const postcssSCSS = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const doiuse = require('doiuse');

const prodConfig = Object.assign({}, devConfig);
const scssLoader = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    use: [
      'css-loader?importLoaders=1',
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              autoprefixer({browsers: ['last 2 versions']}),
            ];
          },
        },
      },
      'sass-loader',
      {
        loader: 'postcss-loader',
        options: {
          syntax: postcssSCSS,
          plugins: function () {
            return [
              postcssEasyImport({
                extensions: '.scss',
              }),
              stylelint(),
              doiuse({
                browsers: ['ie >= 11', 'last 2 versions'],
                ignore: ['flexbox', 'rem'],
                ignoreFiles: ['**/normalize.css'],
              }),
              postcssReporter({
                clearReportedMessages: true,
                throwError: true,
              }),
            ];
          },
        },
      },
    ],
  }),
};

const cssLoader = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    use: 'css-loader',
  })
};

const scriptsLoader = {
  test: /\.(ts|tsx)$/,
  use: [
    'awesome-typescript-loader',
    'tslint-loader'
  ],
};

// replace modules, if already exists modules with same patterns
prodConfig.module.rules = prodConfig.module.rules.map(loader => {
  switch (loader.test.toString()) {
    case scssLoader.test.toString():
      return scssLoader;
    case cssLoader.test.toString():
      return cssLoader;
    case scriptsLoader.test.toString():
      return scriptsLoader;
    default:
      return loader;
  }
});

prodConfig.plugins = [
  new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true,
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'assets/index.html'
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify('production'),
      __HOST__: JSON.stringify('http://localhost:3000'),
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'meta',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: (module, count) => module.context && module.context.includes("node_modules"),
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'shared',
    chunks: ['app'],
    minChunks: (module, count) => module.context && module.context.includes("src/shared"),
  }),
];


prodConfig.devServer.hot = false;

module.exports = prodConfig;
