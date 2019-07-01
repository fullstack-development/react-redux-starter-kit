import webpack from 'webpack';

import { getCommonPlugins, getCommonRules, commonConfig, getStyleRules, ModType } from './common';

const getProdConfig: (mod?: ModType) => webpack.Configuration = (mod) => {
  const defaultMod: ModType = {
    build: 'prod',
    env: 'server',
  };

  const rules = [
    ...getCommonRules(mod || defaultMod),
    ...getStyleRules(mod || defaultMod),
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
    plugins: getCommonPlugins(mod || defaultMod),
  };
};

export default getProdConfig;
