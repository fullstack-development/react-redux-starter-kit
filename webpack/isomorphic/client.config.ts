import * as path from 'path';
import * as webpack from 'webpack';
import devConfig from '../dev.config';
import prodConfig from '../prod.config';

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const clientConfig: webpack.Configuration = {
  ...config,
  name: 'client-web',
  output: {
    ...config.output,
    path: path.resolve(__dirname, '..', '..', 'static'),
  },
};

export default clientConfig;
