import React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import { MainLayout } from './view/components';

const Main: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.main.getElementKey()}
        path={routes.main.getRoutePath()}
        component={MainLayout}
      />
    );
  },
};

export default Main;
