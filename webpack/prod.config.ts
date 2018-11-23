import * as webpack from 'webpack';

import { commonPlugins, commonRules, commonConfig, getStyleRules, BuildType } from './common';

const getProdConfig: (type?: BuildType) => webpack.Configuration = (type) => {
  const rules = [
    ...commonRules(type || 'prod'),
    ...getStyleRules(type || 'prod'),
  ];

  return {
    ...commonConfig,
    mode: 'production',
    entry: {
      app: './client.tsx',
    },
    module: {
      rules,
    },
    plugins: commonPlugins(type || 'prod'),
  };
};

export default getProdConfig;
