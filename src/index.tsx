import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import createRoutes from './routes';
import { HomeModule, OrderFormModule } from './modules';
import configureStore, { createReducer } from './configureStore';
import { Module, IReducerData } from './shared/types/app';
import Api from './shared/api/Api';

// Needed for onTouchTap: http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/* Prepare main app elements */
const history = browserHistory;
const modules: Array<Module<any>> = [ new HomeModule(), new OrderFormModule() ];
const api = new Api('/api');
const store = configureStore(modules, api);
const routes = createRoutes(modules);
const rootComponent = (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

modules.forEach((module: Module<any>) => {
  module.onConnectRequest = onModuleConnectRequest;
});

function onModuleConnectRequest(reducers: Array<IReducerData<any>>) {
  const newReducer = createReducer(modules, reducers);
  store.replaceReducer(newReducer);
}

/* Start application */
if (process.env.NODE_ENV !== 'test') {
  ReactDOM.render(rootComponent, document.getElementById('root'));
}
