import 'reflect-metadata';
import 'babel-polyfill';
import { App } from 'core/App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import bootstrapper from 'react-async-bootstrapper';
import configureApp from 'core/configureApp';

import { AppContainer } from 'react-hot-loader';
import { configureJss } from 'core/configureJss';

const version: string = '0.0.3';

let appData = configureApp();

const jssDeps = configureJss();

async function main() {
  const appForBootstrap = <App {...appData} jssDeps={jssDeps} disableStylesGeneration />;
  await bootstrapper(appForBootstrap);
  const app = <App {...appData} jssDeps={jssDeps} />;

  render(app);
}

/* Start application */
main();

/* Hot Module Replacement API */
if ((module as any).hot && process.env.NODE_ENV !== 'production') {
  (module as any).hot.accept(['./core/App', './core/configureApp'], () => {
    const nextConfigureApp: typeof configureApp = require('./core/configureApp').default;
    const NextApp: typeof App = require('./core/App').App;
    appData = nextConfigureApp(appData);
    render(<NextApp {...appData} jssDeps={jssDeps} />);
  });
}

function render(component: React.ReactElement<any>) {
  ReactDOM.hydrate(
    <AppContainer>{component}</AppContainer>,
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
console.info(`%cApp version: ${version}`, 'background: #EBF5F8; color: gray; font-size: x-medium; border-radius: 5px; padding: 5px;');
/* tslint:enable */
