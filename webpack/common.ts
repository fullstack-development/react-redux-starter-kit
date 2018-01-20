import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';

import * as postcssReporter from 'postcss-reporter';
import * as postcssEasyImport from 'postcss-easy-import';
import * as postcssSCSS from 'postcss-scss';
import * as autoprefixer from 'autoprefixer';
import * as stylelint from 'stylelint';
import * as doiuse from 'doiuse';

import { ROUTES_PREFIX } from '../src/core/constants';

const chunkHash = process.env.NODE_ENV === 'production' ? 'chunkhash' : 'hash';
const hot: boolean = process.env.NODE_ENV === 'production' ? false : true;

// http://www.backalleycoder.com/2016/05/13/sghpa-the-single-page-app-hack-for-github-pages/
const isNeed404Page: boolean = process.env.NODE_ENV_MODE === 'gh-pages' ? true : false;

export const commonPlugins: webpack.Plugin[] = [
  new CleanWebpackPlugin(['build'], { root: path.resolve(__dirname, '..') }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'meta',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: ['app'],
    minChunks: (module, count) => module.context && module.context.includes('node_modules'),
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'shared',
    chunks: ['app'],
    minChunks: (module, count) => module.context && module.context.includes('src/shared'),
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'assets/index.html',
    chunksSortMode(a, b) {
      const order = ['app', 'shared', 'vendor', 'meta'];
      return order.indexOf(b.names[0]) - order.indexOf(a.names[0]);
    },
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV_MODE': JSON.stringify(process.env.NODE_ENV_MODE),
    'process.env.__HOST__': JSON.stringify('http://localhost:3000'),
  }),
].concat(isNeed404Page ? (
  new HtmlWebpackPlugin({
    filename: '404.html',
    template: 'assets/index.html',
    chunksSortMode(a, b) {
      const order = ['app', 'shared', 'vendor', 'meta'];
      return order.indexOf(b.names[0]) - order.indexOf(a.names[0]);
    },
  })
) : []);

export const commonRules: webpack.Rule[] = [
  {
    test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
    use: 'file-loader?name=fonts/[hash].[ext]',
  },
  {
    test: /\.(png|svg)/,
    loader: 'url-loader',
    options: {
      name: 'images/[name].[ext]',
      limit: 10000,
    },
  },
];

export const commonScssLoaders: webpack.Loader[] = [
  'css-loader?importLoaders=1',
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        return [
          autoprefixer({
            browsers: ['last 2 versions'],
          }),
        ];
      },
    },
  },
  'sass-loader',
  {
    loader: 'postcss-loader',
    options: {
      syntax: postcssSCSS,
      plugins: () => {
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
];

export const commonConfig: webpack.Configuration = {
  target: 'web',
  context: path.resolve(__dirname, '..', 'src'),
  output: {
    publicPath: ROUTES_PREFIX + '/',
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'js/[name]-[' + chunkHash + '].bundle.js',
    chunkFilename: 'js/[name]-[' + chunkHash + '].bundle.js',
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    hot,
    contentBase: path.resolve('..', 'build'),
    host: '0.0.0.0',
    port: 8080,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    disableHostCheck: true,
    stats: 'errors-only',
  },
};
