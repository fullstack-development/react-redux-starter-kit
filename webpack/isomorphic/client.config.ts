import * as path from 'path';
import * as webpack from 'webpack';
import devConfig from '../dev.config';
import prodConfig from '../prod.config';

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
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
