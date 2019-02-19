import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';
import path from 'path';

export default function middleware(app: express.Express) {
  app.use(compression());
  app.use(cookieParser());

  app.use('/', express.static(path.join(__dirname, '..', 'static')));

  return app;
}
