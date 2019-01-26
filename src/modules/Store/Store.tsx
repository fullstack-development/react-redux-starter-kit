import React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import { BuyCakesLayout } from './view/components';

const Store: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.store.getElementKey()}
        path={routes.store.getRoutePath()}
        component={BuyCakesLayout}
      />
    );
  },
};

export default Store;
