import * as React from 'react';
import { Route } from 'react-router';
import Layout from './view/Layout/Layout';
import AppNamespace from 'shared/types/app';
import Namespace from './namespace';

class HomeModule implements AppNamespace.Module<Namespace.ReduxState> {
  getRoutes() {
    return <Route key="index" path="index" component={Layout}/>;
  }
}

export default HomeModule;