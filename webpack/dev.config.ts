import * as webpack from 'webpack';

import getEnvParams from '../src/core/getEnvParams';
import { commonPlugins, commonRules, commonConfig, getStyleRules } from './common';

const { withHot } = getEnvParams();

const typescriptRule: webpack.Rule = {
  test: /\.(ts|tsx)$/,
  use: ([] as string[])
    .concat(withHot ? 'react-hot-loader/webpack' : [])
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
    app: ([] as string[])
      .concat(withHot ? 'react-hot-loader/patch' : [])
      .concat('./client.tsx'),
  },
  module: {
    rules,
  },
  plugins,
};

export { typescriptRule };
export default devConfig;
