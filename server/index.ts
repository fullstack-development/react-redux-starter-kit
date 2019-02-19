#!/usr/bin/env node

import express from 'express';
import clientConfig from '../webpack/isomorphic/client.config';
import serverConfig from '../webpack/isomorphic/server.config';
import { startDevelopmentMode, startProductionMode } from './starters';
import middleware from './middleware';

const { NODE_ENV, PORT } = process.env;

const app = middleware(express());

const starters: Record<string, typeof startDevelopmentMode> = {
  development: startDevelopmentMode,
  production: startProductionMode,
};
const starter = NODE_ENV && starters[NODE_ENV] || startDevelopmentMode;

starter(app, clientConfig, serverConfig);

PORT && app.listen(+PORT, '0.0.0.0', (err: any) => {
  if (err) {
    process.stdout.write(err);
  } else {
    process.stdout.write(`\nListening at http://localhost:${PORT.bold}\n`);
  }
});
