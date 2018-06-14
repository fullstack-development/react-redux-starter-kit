import * as webpack from 'webpack';

import getEnvParams from '../src/core/getEnvParams';
import { commonPlugins, commonRules, commonConfig, getStyleRules } from './common';

const { withHot } = getEnvParams();

const typescriptRule: webpack.Rule = {
  test: /\.(ts|tsx)$/,
  use: ([] as webpack.Loader[])
    .concat(withHot ? {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        plugins: [
          'react-hot-loader/babel',
          'syntax-dynamic-import',
        ],
      },
    } : [])
    .concat([
      'awesome-typescript-loader',
      'tslint-loader',
    ]),
};

const rules: webpack.Rule[] = [
  typescriptRule,
  ...commonRules,
  ...getStyleRules('dev'),
];

const plugins: webpack.Plugin[] = commonPlugins
  .concat(withHot ? new webpack.HotModuleReplacementPlugin() : []);

const devConfig: webpack.Configuration = {
  ...commonConfig,
  mode: 'development',
  entry: {
    app: './client.tsx',
  },
  module: {
    rules,
  },
  plugins,
};

export { typescriptRule };
export default devConfig;
