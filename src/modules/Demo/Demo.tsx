import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { IModule } from 'shared/types/app';

import BaseLayout from '../shared/BaseLayout/BaseLayout';
import DemoTranslations from './view/DemoTranslations/DemoTranslations';
import DemoGUI from './view/DemoGUI/DemoGUI';
import { routes } from './routes';

const DemoModule: IModule = {
  getRoutes() {
    return (
      <Route key={routes.demo.getElementKey()} path={routes.demo.getRoutePath()}>
        <BaseLayout>
          <Switch>
            <Route path={routes.demo.gui.getRoutePath()} component={DemoGUI} />
            <Route path={routes.demo.translations.getRoutePath()} component={DemoTranslations} />
            <Redirect push to={routes.demo.translations.getRoutePath()} />
          </Switch>
        </BaseLayout>
      </Route>
    );
  },
};

export default DemoModule;
