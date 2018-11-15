import * as webpack from 'webpack';

import getEnvParams from '../src/core/getEnvParams';
import { commonPlugins, commonRules, commonConfig, getStyleRules } from './common';

const { withHot } = getEnvParams();

const rules: webpack.Rule[] = [
  ...commonRules('dev'),
  ...getStyleRules('dev'),
];

const plugins: webpack.Plugin[] = commonPlugins
  .concat(withHot ? new webpack.HotModuleReplacementPlugin() : []);

const devConfig: webpack.Configuration = {
  ...commonConfig,
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: './client.tsx',
  },
  module: {
    rules,
  },
  plugins,
};

export default devConfig;
