import 'reflect-metadata';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Bootstrapper } from 'shared/helpers/bootstrap';
import configureApp from 'core/configureApp';
import { App } from 'core/App';
import getEnvParams from 'core/getEnvParams';

const { appVersion } = getEnvParams();

const appData = configureApp();

async function main() {
  // await waitForAsyncTasksToComplete();
  const app = <App {...appData} />;
  render(app);
}

async function waitForAsyncTasksToComplete() {
  const appForBootstrap = <App {...appData} disableStylesGeneration />;
  const bootstrapper = new Bootstrapper(appForBootstrap, appData.store);
  await bootstrapper.waitJobsCompletion();
}

/* Start application */
main();

/* Hot Module Replacement API */
if ((module as any).hot && process.env.NODE_ENV !== 'production') {
  (module as any).hot.accept(['./core/App', './core/configureApp'], () => {
    const nextConfigureApp: typeof configureApp = require('./core/configureApp').default;
    const NextApp: typeof App = require('./core/App').App;
    const nextAppData = nextConfigureApp(appData);
    render(<NextApp {...nextAppData} />);
  });
}

function render(component: React.ReactElement<any>) {
  ReactDOM.hydrate(
    component,
    document.getElementById('root'),
    () => {
      // https://material-ui.com/guides/server-rendering/#the-client-side
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    },
  );
}

/* tslint:disable */
console.info(`%cApp version: ${appVersion}`, 'background: #EBF5F8; color: gray; font-size: x-medium; border-radius: 5px; padding: 5px;');
/* tslint:enable */
