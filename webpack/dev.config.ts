import webpack from 'webpack';

import { getCommonRules, commonConfig, getStyleRules, getCommonPlugins, ModType } from './common';

const getDevConfig: (mod?: ModType) => webpack.Configuration = (mod) => {
  const defaultMod: ModType = {
    build: 'dev',
    env: 'serverless',
  };

  const rules: webpack.Rule[] = [
    ...getCommonRules(mod || defaultMod),
    ...getStyleRules(mod || defaultMod),
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
    plugins: getCommonPlugins(mod || defaultMod),
  };
};

export default getDevConfig;
