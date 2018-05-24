import * as webpack from 'webpack';
import * as hotMiddleware from 'webpack-hot-middleware';
import * as SSRMiddleware from 'webpack-isomorphic-dev-middleware';

import { Express } from 'express';

function startDevelopmentMode(
  server: Express, clientConfig: webpack.Configuration, serverConfig: webpack.Configuration,
) {
  const [clientCompiler, serverCompiler] = [
    webpack(clientConfig),
    webpack(serverConfig),
  ];

  server.use(SSRMiddleware(clientCompiler, serverCompiler, { memoryFs: false }));
  server.use(hotMiddleware(clientCompiler));

  server.get('*', (req, res, next) => {
    // res.isomorphic contains `compilation` & `exports` properties:
    // - `compilation` contains the webpack-isomorphic-compiler compilation result
    // - `exports` contains the server exports, usually one or more render functions

    const { compilation, exports: { default: render } } = res.locals.isomorphic;

    const { clientStats } = compilation;
    const assets = extractAssets(clientStats.compilation);

    render({ req, res, assets }).catch((err: any) => setImmediate(() => next(err)));
  });
}

async function startProductionMode(server: Express, ...configs: webpack.Configuration[]) {
  const { err, stats } = await new Promise<{ err: Error, stats: webpack.Stats }>(
    resolve => webpack(configs, (error, wpStats) => resolve({ err: error, stats: wpStats })),
  );
  if (err || stats.hasErrors()) {
    process.stdout.write(`${err}\n`);
    process.stdout.write(`${stats.toString('errors-only')}\n`);
    return;
  }

  process.stdout.write(stats.toString({ colors: true }) + '\n');

  const clientStats = (stats as any).stats.find((stat: any) => stat.compilation.name === 'client-web');
  // const serverStats = (stats as any).stats.find((stat: any) => stat.compilation.name === 'server-web');
  const assets = extractAssets(clientStats.compilation);
  const render = require('../static').default;

  server.get('*', (req, res) => {
    render({ req, res, assets }).catch((error: any) => res.sendStatus(500).write('Server error'));
  });
}

type Asset = 'javascript' | 'styles' | 'assets';

function extractAssets(compilation: any) {
  const publicPath = compilation.options.output.publicPath;
  let assets: Record<Asset, Record<string, string>> = { javascript: {}, styles: {}, assets: {} };

  assets = (Object
    .keys(compilation.assets) as Asset[])
    .reduce((res, key) => {
      const parts = key.split('.');
      const ext = parts[parts.length - 1] as 'js' | 'css';
      const assetTypeByExt: Record<'js' | 'css', Asset> = { js: 'javascript', css: 'styles' };
      const assetType: Asset = assetTypeByExt[ext] || 'assets';
      res[assetType][key] = publicPath + key;

      return res;
    }, assets);

  assets = Object
    .keys(compilation.entrypoints)
    .reduce((res, key) => {
      const entry = compilation.entrypoints[key];
      const files = entry.getFiles();
      const paths = files.map((p: any) => assets.javascript[p]);

      res.javascript[entry.name] = paths[0];

      return res;
    }, assets);

  return assets;
}

export {
  startDevelopmentMode,
  startProductionMode,
};
