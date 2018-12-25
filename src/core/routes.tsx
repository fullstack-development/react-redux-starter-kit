import * as React from 'react';
import { Module } from 'shared/types/app';

import { Route, RouteComponentProps, Redirect, Switch } from 'react-router-dom';
import { App } from 'modules/App';

function getRoutes(modules: Module[]): React.ReactElement<RouteComponentProps<any>> {
  return (
    <Route>
      <App>
        <Switch>
          {/* {modules.map(module => module.getRoutes ? module.getRoutes() : null)} */}
          <Redirect exact to="/" />
        </Switch>
      </App>
    </Route>
  );
}

export default getRoutes;
