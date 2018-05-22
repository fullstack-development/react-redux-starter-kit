import * as webpack from 'webpack';
import devConfig from '../dev.config';
import prodConfig from '../prod.config';

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const clientConfig: webpack.Configuration = {
  ...config,
  name: 'client-web',
  plugins: [
    ...config.plugins || [],
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    }),
  ],
};

export default clientConfig;
