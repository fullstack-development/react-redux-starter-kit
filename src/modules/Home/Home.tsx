import * as React from 'react';
import { Route } from 'react-router';
import Layout from './view/Layout/Layout';
import { Module } from 'shared/types/app';

class HomeModule extends Module<{}, {}> {
  public getRoutes() {
    return <Route key="home" path="home" component={Layout} />;
  }
}

export default HomeModule;
