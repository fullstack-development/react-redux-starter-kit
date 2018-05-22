import * as webpack from 'webpack';
import clientConfig from './isomorphic/server.config';

webpack(clientConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  } else {
    console.log(stats.toString({ colors: true }));
  }
});
