import React from 'react';
import { Route, RouteComponentProps, Redirect, Switch } from 'react-router-dom';
import { default404RedirectPath, modules, RootComponent } from 'config';

function Routes(): React.ReactElement<RouteComponentProps<any>> {
  return (
    <Route path="/">
      <RootComponent>
        <Switch>
          {modules.map(module => module.getRoutes ? module.getRoutes() : null)}
          {default404RedirectPath && <Redirect to={default404RedirectPath} />}
        </Switch>
      </RootComponent>
    </Route>
  );
}

export default Routes;
