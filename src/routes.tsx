import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { App } from './modules/App';
import { IModule } from './shared/types/app';

function getRoutes(modules: Array<IModule<any>>): React.ReactElement<Route.RouteProps> {
  return (
    <Route path="/" component={App}>
      <IndexRedirect to="home"/>
      {modules.map((module: IModule<any>) => module.getRoutes ? module.getRoutes() : null)}
    </Route>
  );
}

export default getRoutes;
