import { ReactElement } from 'react';
import { Route } from 'react-router';

interface Module {
    getRoutes : () => ReactElement<Route.RouteProps> | Array<ReactElement<Route.RouteProps>>
}

export { Module };
