import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import { ProfileLayout, SavedListLayout } from './view/components';

const Profile: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.profile.getElementKey()}
        path={routes.profile.getRoutePath()}
      >
        <Switch>
          <Route
            key={routes.profile.edit.getElementKey()}
            path={routes.profile.edit.getRoutePath()}
            component={ProfileLayout}
          />
          <Route
            key={routes.profile.saved.getElementKey()}
            path={routes.profile.saved.getRoutePath()}
            component={SavedListLayout}
          />
        </Switch>
      </Route>
    );
  },
};

export default Profile;
