import * as React from 'react';
import { Route, Redirect, RouteComponentProps, Switch } from 'react-router-dom';
import { App } from './modules/App';
import { Module } from './shared/types/app';

function getRoutes(modules: Array<Module<any, any>>): React.ReactElement<RouteComponentProps<any>> {
  return (
    <Route path="/">
      <App>
        <Switch>
          {modules.map((module: Module<any, any>) => module.getRoutes ? module.getRoutes() : null)}
          <Redirect to="/home" from="/" />
        </Switch>
      </App>
    </Route>
  );
}

export default getRoutes;
