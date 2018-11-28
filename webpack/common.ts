import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as threadLoader from 'thread-loader';

import * as postcssReporter from 'postcss-reporter';
import * as postcssEasyImport from 'postcss-easy-import';
import * as postcssSCSS from 'postcss-scss';
import * as autoprefixer from 'autoprefixer';
import * as stylelint from 'stylelint';
import * as doiuse from 'doiuse';

import { ROUTES_PREFIX } from '../src/core/constants';
import getEnvParams from '../src/core/getEnvParams';

export type BuildType = 'dev' | 'prod' | 'server';

const { chunkHash, withAnalyze, chunkName, withHot } = getEnvParams();
// http://www.backalleycoder.com/2016/05/13/sghpa-the-single-page-app-hack-for-github-pages/
const isNeed404Page: boolean = process.env.NODE_ENV_MODE === 'gh-pages' ? true : false;
const workerPool = {
  workers: require('os').cpus().length - 1,
  poolTimeout: withHot ? Infinity : 2000,
};

threadLoader.warmup(workerPool, [
  'babel-loader',
  'ts-loader',
  'postcss-loader',
  'sass-loader',
]);

export const getCommonPlugins: (type: BuildType) => webpack.Plugin[] = (type) => [
  new CleanWebpackPlugin(['build', 'static'], { root: path.resolve(__dirname, '..') }),
  new MiniCssExtractPlugin({
    filename: `css/[name].[${chunkHash}].css`,
    chunkFilename: `css/[id].[${chunkHash}].css`,
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'assets/index.html',
    chunksSortMode: sortChunks,
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV_MODE': JSON.stringify(process.env.NODE_ENV_MODE),
    '__HOST__': JSON.stringify('http://localhost:3000'),
    '__LANG__': JSON.stringify(process.env.LANG || 'en'),
    '__CLIENT__': true,
    '__SERVER__': false,
  })]
  .concat(type !== 'server' ? (
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      async: false,
      tsconfig: path.resolve('./tsconfig.json'),
      tslint: path.resolve('./tslint.json'),
    })) : [])
  .concat(withAnalyze ? (
    new BundleAnalyzerPlugin()
  ) : [])
  .concat(isNeed404Page ? (
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: 'assets/index.html',
      chunksSortMode: sortChunks,
    })
  ) : [])
  .concat(withHot && type === 'dev' ? (
    new webpack.HotModuleReplacementPlugin()
  ) : []);

function sortChunks(a: webpack.compilation.Chunk, b: webpack.compilation.Chunk) {
  const order = ['app', 'vendors', 'runtime'];
  return order.findIndex(item => b.name === item) - order.findIndex(item => a.name === item);
}

export const getCommonRules: (type: BuildType) => webpack.Rule[] = (type) => [
  {
    test: /\.tsx?$/,
    use: ([
      {
        loader: 'thread-loader',
        options: workerPool,
      }] as webpack.Loader[])
      .concat(withHot && type === 'dev' ? {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          plugins: [
            'react-hot-loader/babel',
            'syntax-dynamic-import',
          ],
        },
      } : [])
      .concat({
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          happyPackMode: true,
          logLevel: 'error',
        },
      }),
  },
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

export function getStyleRules(type: BuildType) {
  const cssLoaders: Record<BuildType, webpack.Loader[]> = {
    dev: ['style-loader', 'css-loader'],
    prod: [MiniCssExtractPlugin.loader, 'css-loader'],
    server: ['css-loader/locals'],
  };
  const scssFirstLoaders: Record<BuildType, webpack.Loader[]> = {
    dev: ['style-loader', 'css-loader?importLoaders=1'],
    prod: [MiniCssExtractPlugin.loader, 'css-loader?importLoaders=1'],
    server: ['css-loader/locals?importLoaders=1'],
  };

  return [
    {
      test: /\.css$/,
      use: cssLoaders[type],
    },
    {
      test: /\.scss$/,
      use: (scssFirstLoaders[type]).concat(commonScssLoaders),
    },
  ];
}

const commonScssLoaders: webpack.Loader[] = [
  {
    loader: 'thread-loader',
    options: workerPool,
  },
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
            // https://github.com/browserslist/browserslist
            // to view resulting browsers list, use the command in terminal `npx browserslist "defaults, not ie > 0"`
            browsers: ['defaults', 'not op_mini all', 'not ie > 0', 'not ie_mob > 0'],
            ignore: [],
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
    filename: `js/[name]-[${chunkHash}].bundle.js`,
    chunkFilename: `js/[${chunkName}]-[${chunkHash}].bundle.js`,
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  stats: {
    // typescript would remove the interfaces but also remove the imports of typings
    // and because of this, warnings are shown https://github.com/TypeStrong/ts-loader/issues/653
    warningsFilter: /export .* was not found in/,
  },
  devServer: {
    hot: withHot,
    contentBase: path.resolve('..', 'build'),
    host: '0.0.0.0',
    port: 8080,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    disableHostCheck: true,
    stats: {
      colors: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      assets: false,
      modules: false,
      warningsFilter: /export .* was not found in/,
    },
  },
};
