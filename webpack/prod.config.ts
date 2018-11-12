import * as webpack from 'webpack';

import { commonPlugins, commonRules, commonConfig, getStyleRules } from './common';

const rules = [
  ...commonRules,
  ...getStyleRules('prod'),
];

const prodConfig: webpack.Configuration = {
  ...commonConfig,
  mode: 'production',
  entry: {
    app: './client.tsx',
  },
  module: {
    rules,
  },
  plugins: commonPlugins,
};

export default prodConfig;
