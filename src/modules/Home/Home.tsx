import React from 'react';
import { Route } from 'react-router-dom';

import { IModule } from 'shared/types/app';

import { routes } from './routes';
import { HomeLayout } from './view/components';

const Home: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.home.getElementKey()}
        path={routes.home.getRoutePath()}
        component={HomeLayout}
      />
    );
  },
};

export default Home;
