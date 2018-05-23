import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

import { commonPlugins, extractedStyleRules, commonRules, commonConfig } from './common';

const rules = commonRules
  .concat(extractedStyleRules)
  .concat([
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: { target: 'es5' },
        },
        'tslint-loader',
      ],
    },
  ]);

const plugins = commonPlugins.concat([
  new ExtractTextPlugin({
    filename: 'css/[name]-[chunkhash].css',
    allChunks: true,
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
    app: './client.tsx',
  },
  module: {
    rules,
  },
  plugins,
};

export default prodConfig;
