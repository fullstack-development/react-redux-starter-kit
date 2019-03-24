import webpack from 'webpack';
import { Express } from 'express';
import hotMiddleware from 'webpack-hot-middleware';
import SSRMiddleware from 'webpack-isomorphic-dev-middleware';
import $ from 'cheerio';

import { IAssets } from '../src/shared/types/app';

function startDevelopmentMode(
  server: Express, clientConfig: webpack.Configuration, serverConfig: webpack.Configuration,
) {
  const [clientCompiler, serverCompiler] = [
    webpack(clientConfig),
    webpack(serverConfig),
  ];

  server.use(SSRMiddleware(clientCompiler, serverCompiler, { memoryFs: false }));
  server.use(hotMiddleware(clientCompiler));

  server.get('*', async (req, res, next) => {
    // res.isomorphic contains `compilation` & `exports` properties:
    // - `compilation` contains the webpack-isomorphic-compiler compilation result
    // - `exports` contains the server exports, usually one or more render functions
    const { compilation, exports: { default: render } } = res.locals.isomorphic;
    const { clientStats } = compilation;

    const assets = extractAssets(clientStats.compilation);
    render({ req, res, assets })
      .catch((err: any) => {
        process.stdout.write(err);
        setImmediate(() => next(err));
      });
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
    render({ req, res, assets }).catch((_error: any) => res.sendStatus(500).write('Server error'));
  });
}

function extractAssets(compilation: any): IAssets {
  const appChunkGroup = compilation.chunkGroups.find((group: any) => group.name === 'app');
  const files: string[] = !appChunkGroup ? [] : appChunkGroup.chunks
    .map((item: any) => item.files)
    .reduce((acc: string[], cur: string[]) => acc.concat(cur), []);

  // try to extract favicons html from compilation
  const compiledStaticHtml = compilation.assets['index.html'].source();
  const staticDom = $(compiledStaticHtml);
  const links = staticDom.filter(i => staticDom[i].name === 'link');

  return {
    javascript: files.filter(file => /\.js$/.test(file)),
    styles: files.filter(file => /\.css$/.test(file)),
    favicons: links.toArray(),
  };
}

export {
  startDevelopmentMode,
  startProductionMode,
};
