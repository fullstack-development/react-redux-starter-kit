import * as webpack from 'webpack';

import { commonPlugins, commonScssLoaders, commonRules, commonConfig } from './common';

const rules: webpack.Rule[] = commonRules.concat([
  {
    test: /\.(ts|tsx)$/,
    use: [
      'react-hot-loader/webpack',
      'awesome-typescript-loader',
      'tslint-loader',
    ],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.scss$/,
    use: (['style-loader'] as webpack.Loader[]).concat(commonScssLoaders),
  },
]);

const plugins: webpack.Plugin[] = commonPlugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
  new webpack.NamedModulesPlugin(),
]);

const devConfig: webpack.Configuration = {
  ...commonConfig,
  entry: {
    app: [
      'react-hot-loader/patch',
      './index.tsx',
    ],
  },
  module: {
    rules,
  },
  plugins,
};

export default devConfig;
