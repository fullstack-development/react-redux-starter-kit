#!/usr/bin/env node

import * as express from 'express';
import clientConfig from '../webpack/isomorphic/client.config';
import serverConfig from '../webpack/isomorphic/server.config';
import { startDevelopmentMode, startProductionMode } from './starters';
import middleware from './middleware';

interface IEnv {
  NODE_ENV: 'development' | 'production';
  PORT: number;
}

const { NODE_ENV, PORT } = process.env as IEnv;

const app = middleware(express());

const starters = {
  development: startDevelopmentMode,
  production: startProductionMode,
};
const starter = starters[NODE_ENV] || startDevelopmentMode;

starter(app, clientConfig, serverConfig);

app.listen(PORT, '0.0.0.0', (err: any) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Listening at http://localhost:${PORT}`.bold);
  }
});
