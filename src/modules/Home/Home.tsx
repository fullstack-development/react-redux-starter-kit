import * as React from 'react';
import { Route } from 'react-router-dom';
import { Module } from 'shared/types/app';

import Layout from './view/Layout/Layout';

class HomeModule extends Module {
  public getRoutes() {
    return <Route key="home" path="/home" component={Layout} />;
  }
}

export default HomeModule;
