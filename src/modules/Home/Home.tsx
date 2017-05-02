import * as React from 'react';
import { Route } from 'react-router-dom';
import { Module } from 'shared/types/app';

class HomeModule extends Module<{}, {}> {
  public getRoutes() {
    const Layout = require('./view/Layout/Layout').default;
    return <Route key="home" path="/home" component={Layout} />;
  }
}

export default HomeModule;
