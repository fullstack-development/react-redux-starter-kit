import webpack from 'webpack';

import { getCommonPlugins, getCommonRules, commonConfig, getStyleRules, BuildType } from './common';

const getProdConfig: (type?: BuildType) => webpack.Configuration = (type) => {
  const rules = [
    ...getCommonRules(type || 'prod'),
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
    plugins: getCommonPlugins(type || 'prod'),
  };
};

export default getProdConfig;
