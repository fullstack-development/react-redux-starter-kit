import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import 'normalize.css';

import { IAppData, IModule } from 'shared/types/app';
import { ThemeProvider } from 'services/theme';
import { containers as NotificationContainers } from 'services/notification';
import { BaseStyles } from 'shared/styles';

import createRoutes from './routes';

interface IAppProps {
  disableStylesGeneration?: boolean;
}

function ClientApp({ modules, store, disableStylesGeneration }: IAppData & IAppProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderSharedPart(modules, disableStylesGeneration)}
      </BrowserRouter>
    </Provider>
  );
}

export const App = hot(ClientApp);

interface IServerAppProps {
  disableStylesGeneration?: boolean;
}

export function ServerApp(props: IAppData & IServerAppProps & StaticRouter['props']) {
  const { modules, store, disableStylesGeneration, ...routerProps } = props;
  return (
    <Provider store={store}>
      <StaticRouter {...routerProps}>
        {renderSharedPart(modules, disableStylesGeneration)}
      </StaticRouter>
    </Provider>
  );
}

function renderSharedPart(modules: IModule[], disableStylesGeneration?: boolean) {
  return (
    <ThemeProvider disableStylesGeneration={disableStylesGeneration}>
      <BaseStyles />
      {createRoutes(modules)}
      <NotificationContainers.Notification />
    </ThemeProvider>
  );
}
