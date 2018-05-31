import * as webpack from 'webpack';

import { commonPlugins, commonRules, commonConfig, getStyleRules } from './common';

const typescriptRule: webpack.Rule = {
  test: /\.(ts|tsx)$/,
  use: [
    {
      loader: 'awesome-typescript-loader',
      options: { target: 'es5' },
    },
    'tslint-loader',
  ],
};

const rules = [
  typescriptRule,
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

export { typescriptRule };
export default prodConfig;
