import * as webpack from 'webpack';

import getEnvParams from '../src/core/getEnvParams';
import { commonPlugins, commonRules, commonConfig, getStyleRules, BuildType } from './common';

const { withHot } = getEnvParams();

const getDevConfig: (type?: BuildType) => webpack.Configuration = (type) => {
  const rules: webpack.Rule[] = [
    ...commonRules(type || 'dev'),
    ...getStyleRules(type || 'dev'),
  ];
  const plugins: webpack.Plugin[] = commonPlugins(type || 'dev')
    .concat(withHot ? new webpack.HotModuleReplacementPlugin() : []);

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
    plugins,
  };
};

export default getDevConfig;
