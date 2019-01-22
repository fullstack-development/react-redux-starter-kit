import * as path from 'path';
import * as webpack from 'webpack';

import getDevConfig from '../dev.config';
import getProdConfig from '../prod.config';

const config = process.env.NODE_ENV === 'production' ? getProdConfig('server') : getDevConfig('server');

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
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __DISABLE_SSR__: process.env.DISABLE_SSR,
    }),
    ...config.plugins || [],
  ],
  optimization: {
    ...config.optimization,
    splitChunks: false,
    runtimeChunk: false,
  },
};

export default serverConfig;
