import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import 'normalize.css';

import { IAppData, IModule } from 'shared/types/app';
import { ThemeProvider } from 'services/theme';
import { containers as NotificationContainers } from 'services/notification';
import { BaseStyles } from 'shared/styles';

import { getRoutes } from './routes';

function ClientApp({ modules, store }: IAppData) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderSharedPart(modules)}
      </BrowserRouter>
    </Provider>
  );
}

export const App = hot(ClientApp);

export function ServerApp(props: IAppData & StaticRouter['props']) {
  const { modules, store, ...routerProps } = props;
  return (
    <Provider store={store}>
      <StaticRouter {...routerProps}>
        {renderSharedPart(modules)}
      </StaticRouter>
    </Provider>
  );
}

function renderSharedPart(modules: IModule[]) {
  return (
    <ThemeProvider>
      <BaseStyles />
      {getRoutes(modules)}
      <NotificationContainers.Notification />
    </ThemeProvider>
  );
}
