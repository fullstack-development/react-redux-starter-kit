import * as React from 'react';
import { Module } from '../Module';
import { Route } from 'react-router';
import Layout from './view/Layout';

class IndexModule implements Module {
    getRoutes() {
        return <Route key="index" path="index" component={Layout} />;
    }
}

export default IndexModule;