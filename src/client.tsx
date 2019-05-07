import 'reflect-metadata';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import bootstrapper from 'react-async-bootstrapper';

import { App } from 'core/render';
import configureApp from 'core/configure';
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
  (module as any).hot.accept(['./core/render', './core/configure'], () => {
    const nextConfigureApp: typeof configureApp = require('./core/configure').default;
    const NextApp: typeof App = require('./core/render').App;
    const nextAppData = nextConfigureApp(appData);
    render(<NextApp {...nextAppData} />);
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
