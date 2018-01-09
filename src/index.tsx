import 'reflect-metadata';
import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import configureApp from 'core/configureApp';

import { AppContainer } from 'react-hot-loader';
import App from 'core/App';

const version: string = '0.0.0';

let appData = configureApp();
const render = (component: React.ReactElement<any>) => ReactDOM.render(
  <AppContainer>{component}</AppContainer>,
  document.getElementById('root'),
);

/* Start application */
render(<App modules={appData.modules} store={appData.store} />);

/* Hot Module Replacement API */
if ((module as any).hot && process.env.NODE_ENV !== 'production') {
  (module as any).hot.accept(['./core/App', './core/configureApp'], () => {
    const nextConfigureApp: typeof configureApp = require('./core/configureApp').default;
    const NextApp: typeof App = require('./core/App').default;
    appData = nextConfigureApp(appData);
    render(<NextApp modules={appData.modules} store={appData.store} />);
  });
}

/* tslint:disable */
console.info(`%cApp version: ${version}`, 'background: #EBF5F8; color: gray; font-size: x-medium; border-radius: 5px; padding: 5px;');
/* tslint:enable */
