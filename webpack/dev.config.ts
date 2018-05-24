import * as webpack from 'webpack';

import { commonPlugins, commonScssLoaders, commonRules, commonConfig } from './common';

const withHot = process.env.WATCH_MODE === 'true';

const typescriptRule: webpack.Rule = {
  test: /\.(ts|tsx)$/,
  use: ([] as string[])
    .concat(withHot ? 'react-hot-loader/webpack' : [])
    .concat([
      'awesome-typescript-loader',
      'tslint-loader',
    ]),
};

const rules: webpack.Rule[] = commonRules.concat([
  typescriptRule,
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.scss$/,
    use: (['style-loader'] as webpack.Loader[]).concat(commonScssLoaders),
  },
]);

const plugins: webpack.Plugin[] = commonPlugins
  .concat(withHot ? new webpack.HotModuleReplacementPlugin() : [])
  .concat(new webpack.NamedModulesPlugin());

const devConfig: webpack.Configuration = {
  ...commonConfig,
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
