import * as React from 'react';
import { Route, RouteComponentProps, Redirect, Switch } from 'react-router-dom';
import { App } from 'modules/App';
import { Module } from 'shared/types/app';

function getRoutes(modules: Module[]): React.ReactElement<RouteComponentProps<any>> {
  return (
    <Route path="/">
      <App>
        <Switch>
          {modules.map(module => module.getRoutes ? module.getRoutes() : null)}
          <Redirect exact from="/" to="/home" />
        </Switch>
      </App>
    </Route>
  );
}

export default getRoutes;
