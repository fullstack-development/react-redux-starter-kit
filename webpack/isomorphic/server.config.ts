import * as path from 'path';
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

import devConfig from '../dev.config';
import prodConfig from '../prod.config';

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const serverConfig: webpack.Configuration = {
  ...config,
  name: 'server-web',
  target: 'node',
  entry: {
    main: './server.tsx',
  },
  output: {
    ...config.output,
    filename: 'index.js',
    path: path.resolve(__dirname, '..', '..', 'static'),
    libraryTarget: 'commonjs2',
  },
  module: {
    ...config.module,
    rules: prodConfig.module ? (prodConfig.module as webpack.NewModule).rules : [],
  },
  externals: [
    nodeExternals({
      whitelist: [
        'bootstrap/dist/css/bootstrap.min.css',
        'react-select/dist/react-select.min.css',
      ],
    }),
  ],
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __DISABLE_SSR__: process.env.DISABLE_SSR,
    }),
    ...(config.plugins || []).filter(item => !(item instanceof webpack.optimize.CommonsChunkPlugin)),
    new ExtractTextPlugin({
      filename: 'css/[name]-[chunkhash].css',
      allChunks: true,
    }),
  ],
};

export default serverConfig;
