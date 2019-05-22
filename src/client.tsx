import 'reflect-metadata';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import bootstrapper from 'react-async-bootstrapper';

import configureApp from 'core/configureApp';
import { App } from 'core/App';
import getEnvParams from 'core/getEnvParams';

const { appVersion } = getEnvParams();

const appData = configureApp();

async function main() {
  const appForBootstrap = <App {...appData} disableStylesGeneration />;
  await bootstrapper(appForBootstrap);
  const app = <App {...appData} />;

  render(app);
}

/* Start application */
main();

/* Hot Module Replacement API */
if ((module as any).hot && process.env.NODE_ENV !== 'production') {
  (module as any).hot.accept(['./core/App', './core/configureApp'], () => {
    const nextConfigureApp: typeof configureApp = require('./core/configureApp').default;
    const NextApp: typeof App = require('./core/App').App;
    const nextAppData = nextConfigureApp(appData);
    render(<NextApp {...nextAppData} jssDeps={appData.jssDeps} />);
  });
}

function render(component: React.ReactElement<any>) {
  ReactDOM.hydrate(
    component,
    document.getElementById('root'),
    () => {
      // We don't need the static css any more once we have launched our application.
      const ssStyles = document.getElementById('server-side-styles');
      if (ssStyles && ssStyles.parentNode) {
        ssStyles.parentNode.removeChild(ssStyles);
      }
    },
  );
}

/* tslint:disable */
console.info(`%cApp version: ${appVersion}`, 'background: #EBF5F8; color: gray; font-size: x-medium; border-radius: 5px; padding: 5px;');
/* tslint:enable */
