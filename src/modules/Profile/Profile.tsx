import React from 'react';
import { Route } from 'react-router-dom';

import { IModule } from 'core/types';
import routes from 'modules/routes';

import { ProfileLayout } from './view/components';

const Profile: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.profile.getElementKey()}
        path={routes.profile.getRoutePath()}
        component={ProfileLayout}
      />
    );
  },
};

export default Profile;
