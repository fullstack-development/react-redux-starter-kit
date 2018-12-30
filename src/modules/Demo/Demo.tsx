import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import DemoGUI from './view/DemoGUI/DemoGUI';
import DemoTranslations from './view/DemoTranslations/DemoTranslations';

const DemoModule: IModule = {
  getRoutes() {
    return (
      <Route key="demo" path={routes.demo.getRoutePath()}>
        <Switch>
          <Route path={routes.demo.gui.getRoutePath()} component={DemoGUI} />
          <Route path={routes.demo.translations.getRoutePath()} component={DemoTranslations} />
          <Redirect to={routes.demo.gui.getRedirectPath()} />
        </Switch>
      </Route>
    );
  },
};

export default DemoModule;
