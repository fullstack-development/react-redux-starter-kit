import React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import { BuyCakeProposal } from './view/components';

const Cake: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.home.getElementKey()}
        path={routes.home.getRoutePath()}
        component={BuyCakeProposal}
      />
    );
  },
};

export default Cake;
