import * as React from 'react';
import { Route } from 'react-router-dom';

import { Module } from 'shared/types/app';

import { routes } from './constants';
import { Layout } from './view/containers';

class HomeModule extends Module {
  public getRoutes() {
    return (
      <Route
        key={routes.home.getElementKey()}
        path={routes.home.getRoutePath()}
        component={Layout}
      />
    );
  }
}

export default HomeModule;
