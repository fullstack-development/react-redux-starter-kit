import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import createRoutes from './routes';
import {Module} from "./modules/Module";
import configureStore from "./configureStore";
import {TestModule} from './modules';

/* Prepare main app elements */
const history = browserHistory;
const modules : Array<Module> = [ new TestModule() ];
const store = configureStore();
const routes = createRoutes(modules);

/* Start application */
ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
);



