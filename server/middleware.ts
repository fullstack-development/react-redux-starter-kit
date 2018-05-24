import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as path from 'path';

export default function middleware(app: express.Express) {
  app.use(compression());
  app.use(cookieParser());

  app.use('/', express.static(path.join(__dirname, '..', 'static')));

  return app;
}
