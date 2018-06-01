import 'reflect-metadata';
import 'babel-polyfill';
import { App } from 'core/App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import bootstrapper from 'react-async-bootstrapper';
import configureApp from 'core/configureApp';

import { AppContainer } from 'react-hot-loader';

const version: string = '0.0.3';

let appData = configureApp();
function render(component: React.ReactElement<any>) {
  const app = <AppContainer>{component}</AppContainer>;
  bootstrapper(app)
    .then(() => ReactDOM.hydrate(app, document.getElementById('root')))
    .catch((err: any) => console.log('Eek, error!', err));
}

/* Start application */
render(<App modules={appData.modules} store={appData.store} />);

/* Hot Module Replacement API */
if ((module as any).hot && process.env.NODE_ENV !== 'production') {
  (module as any).hot.accept(['./core/App', './core/configureApp'], () => {
    const nextConfigureApp: typeof configureApp = require('./core/configureApp').default;
    const NextApp: typeof App = require('./core/App').App;
    appData = nextConfigureApp(appData);
    render(<NextApp modules={appData.modules} store={appData.store} />);
  });
}

/* tslint:disable */
console.info(`%cApp version: ${version}`, 'background: #EBF5F8; color: gray; font-size: x-medium; border-radius: 5px; padding: 5px;');
/* tslint:enable */
