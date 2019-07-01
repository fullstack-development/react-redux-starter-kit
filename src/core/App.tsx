import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import 'normalize.css';

import { hot } from 'react-hot-loader/root';
import { containers as NotificationContainers } from 'services/notification';
import { IAppData, IModule } from 'shared/types/app';

import createRoutes from './routes';

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

interface IServerAppProps {
  disableStylesGeneration?: boolean;
}

export function ServerApp(props: IAppData & IServerAppProps & StaticRouter['props']) {
  const { modules, store, ...routerProps } = props;
  return (
    <Provider store={store}>
      <StaticRouter {...routerProps}>
        {renderSharedPart(modules)}
      </StaticRouter>
    </Provider>
  );
}

function renderSharedPart(
  modules: IModule[],
) {

  // FIXME: Стоит избавить от фрагмент
  return (
    <>
      {createRoutes(modules)}
      <NotificationContainers.Notification />
    </>
  );
}
