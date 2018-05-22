import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

import {
  commonPlugins,
  commonScssLoaders,
  commonRules, commonConfig,
} from './common';

const withHot = process.env.WATCH_MODE === 'true';

const rules: webpack.Rule[] = commonRules.concat([
  {
    test: /\.(ts|tsx)$/,
    use: ([] as string[])
      .concat(withHot ? 'react-hot-loader/webpack' : [])
      .concat([
        'awesome-typescript-loader',
        'tslint-loader',
      ]),
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
// .concat(extractedStyleRules);

const plugins: webpack.Plugin[] = commonPlugins
  .concat(withHot ? new webpack.HotModuleReplacementPlugin() : [])
  .concat(new webpack.NamedModulesPlugin())
  .concat(new ExtractTextPlugin({
    filename: 'css/[name]-[chunkhash].css',
    allChunks: true,
  }));

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

export default devConfig;
