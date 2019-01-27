import React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import { SearchLayout } from './view/components';

const Search: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.search.getElementKey()}
        path={routes.search.getRoutePath()}
        component={SearchLayout}
      />
    );
  },
};

export default Search;
