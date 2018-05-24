import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

import { IAppData } from 'shared/types/app';

import createRoutes from './routes';

export function App({ modules, store }: IAppData) {
  return (
    <Provider store={store}>
      <BrowserRouter>{createRoutes(modules)}</BrowserRouter>
    </Provider>
  );
}

export function ServerApp({ modules, store, ...routerProps }: IAppData & StaticRouter['props']) {
  return (
    <Provider store={store}>
      <StaticRouter {...routerProps}>{createRoutes(modules)}</StaticRouter>
    </Provider>
  );
}
