import * as React from 'react';
import { Route } from 'react-router';
import Layout from './view/Layout/Layout';
import { IModule } from 'shared/types/app';
import Namespace from './namespace';

class HomeModule implements IModule<Namespace.ReduxState> {
  public getRoutes() {
    return <Route key="home" path="home" component={Layout} />;
  }
}

export default HomeModule;
