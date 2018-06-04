import * as React from 'react';
import { Route } from 'react-router-dom';
import { ROUTES_PREFIX } from 'core/constants';

import { Module } from 'shared/types/app';

import { Layout } from './view/containers';

class HomeModule extends Module {
  public getRoutes() {
    return <Route key="home" path={`${ROUTES_PREFIX}/home`} component={Layout} />;
  }
}

export default HomeModule;
