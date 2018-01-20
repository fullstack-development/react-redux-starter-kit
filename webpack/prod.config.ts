import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

import { commonPlugins, commonScssLoaders, commonRules, commonConfig } from './common';

const rules = commonRules.concat([
  {
    test: /\.(ts|tsx)$/,
    use: [
      'awesome-typescript-loader',
      'tslint-loader',
    ],
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: 'css-loader',
    }),
  },
  {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      use: commonScssLoaders,
    }),
  },
]);

const plugins = commonPlugins.concat([
  new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true,
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
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
  }),
]);

const prodConfig: webpack.Configuration = {
  ...commonConfig,
  entry: {
    app: './index.tsx',
  },
  module: {
    rules,
  },
  plugins,
};

export default prodConfig;
