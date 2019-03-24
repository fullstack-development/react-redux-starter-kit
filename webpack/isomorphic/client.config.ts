import path from 'path';
import webpack from 'webpack';
import getDevConfig from '../dev.config';
import getProdConfig from '../prod.config';

const config = process.env.NODE_ENV === 'production' ? getProdConfig('server') : getDevConfig('server');
const withHot = process.env.WATCH_MODE === 'true';

const clientConfig: webpack.Configuration = {
  ...config,
  name: 'client-web',
  entry: {
    ...config.entry as webpack.Entry,
    app: ([] as string[])
      .concat((config.entry as webpack.Entry).app)
      .concat(withHot ? 'webpack-hot-middleware/client' : []),
  },
  output: {
    ...config.output,
    path: path.resolve(__dirname, '..', '..', 'static'),
  },
};

export default clientConfig;
