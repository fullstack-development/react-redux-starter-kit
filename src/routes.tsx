import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { App } from './modules/App';
import AppNamespace from './shared/types/app';
import Module = AppNamespace.Module;

function getRoutes(modules: Array<Module<any>>): React.ReactElement<Route.RouteProps> {
  return (
    <Route path="/" component={App}>
      <IndexRedirect to="index"/>
      {modules.map((module: Module<any>) => module.getRoutes ? module.getRoutes() : null)}
    </Route>
  );
}

export default getRoutes;