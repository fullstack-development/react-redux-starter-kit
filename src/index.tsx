import 'reflect-metadata';
import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from 'core/App';
import configureApp from 'core/configureApp';

const version: string = '0.0.0';

const appData = configureApp();

/* Start application */
ReactDOM.render(<App {...appData} />, document.getElementById('root'));

/* tslint:disable */
console.info(`%cApp version: ${version}`, 'background: #EBF5F8; color: gray; font-size: x-medium; border-radius: 5px; padding: 5px;');
/* tslint:enable */
