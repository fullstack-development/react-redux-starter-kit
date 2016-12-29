import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import createRoutes from './routes';
import { HomeModule, OrderFormModule } from './modules';
import configureStore from './configureStore';
import { IModule } from './shared/types/app';
import Api from './shared/api/Api';

// Needed for onTouchTap: http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/* Prepare main app elements */
const history = browserHistory;
const modules: Array<IModule<any>> = [ new HomeModule(), new OrderFormModule() ];
const api = new Api('/api');
const store = configureStore(modules, api);
const routes = createRoutes(modules);

/* Start application */
ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  ),
  document.getElementById('root'),
);
