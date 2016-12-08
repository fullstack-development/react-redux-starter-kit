import * as React from 'react';
import {Module} from '../Module';
import {Route} from 'react-router';
import TestComponent from './view/TestComponent';

class TestModule implements Module {
    getRoutes () {
        return (
            <Route key="test" path="test" component={TestComponent} />
        );
    }
}

export default TestModule;
