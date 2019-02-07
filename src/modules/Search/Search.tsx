import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import { UserSearchLayout } from './view/components';

const Search: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.search.getElementKey()}
        path={routes.search.getRoutePath()}
      >
        <Switch>
          <Route
            key={routes.search.users.getElementKey()}
            path={routes.search.users.getRoutePath()}
            component={UserSearchLayout}
          />
        </Switch>
      </Route>
    );
  },
};

export default Search;
