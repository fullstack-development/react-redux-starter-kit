import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import createRoutes from './routes';
import { HomeModule } from './modules';
import configureStore from './configureStore';
import AppNamespace from './shared/types/app';
import Module = AppNamespace.Module;

// Needed for onTouchTap: http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/* Prepare main app elements */
const history = browserHistory;
const modules: Array<Module<any>> = [ new HomeModule() ];
const store = configureStore(modules);
const routes = createRoutes(modules);

/* Start application */
ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
);



