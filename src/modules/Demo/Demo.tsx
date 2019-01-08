import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';
import BaseLayout from '../shared/BaseLayout/BaseLayout';

import DemoGUI from './view/DemoGUI/DemoGUI';
import DemoTranslations from './view/DemoTranslations/DemoTranslations';

const DemoModule: IModule = {
  getRoutes() {
    return (
      <Route key="demo" path={routes.demo.getRoutePath()}>
        <Switch>
          <BaseLayout>
            <Route path={routes.demo.gui.getRoutePath()} component={DemoGUI} />
            <Route path={routes.demo.translations.getRoutePath()} component={DemoTranslations} />
          </BaseLayout>
        </Switch>
      </Route>
    );
  },
};

export default DemoModule;
