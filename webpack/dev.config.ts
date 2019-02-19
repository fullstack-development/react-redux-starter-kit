import webpack from 'webpack';

import { getCommonRules, commonConfig, getStyleRules, BuildType, getCommonPlugins } from './common';

const getDevConfig: (type?: BuildType) => webpack.Configuration = (type) => {
  const rules: webpack.Rule[] = [
    ...getCommonRules(type || 'dev'),
    ...getStyleRules(type || 'dev'),
  ];

  return {
    ...commonConfig,
    mode: 'development',
    devtool: 'source-map',
    entry: {
      app: './client.tsx',
    },
    module: {
      rules,
    },
    plugins: getCommonPlugins(type || 'dev'),
  };
};

export default getDevConfig;
