import * as React from 'react';
import {Route} from 'react-router';
import {Module} from './modules/Module';
import {App} from './modules/App';

function getRoutes (modules : Array<Module>) : React.ReactElement<Route.RouteProps> {
    return (
        <Route path="/" component={App}>
            {modules.map((module : Module) => module.getRoutes())}
        </Route>
    );
}

export default getRoutes;