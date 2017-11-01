import * as React from 'react';
import { Route } from 'react-router-dom';

import * as NS from './namespace';
import { Module } from 'shared/types/app';

import Layout from './view/Layout/Layout';

class OrderForm extends Module {
  public getRoutes() {
    return <Route key="order" exact path="/order" component={Layout} />;
  }
}

export { NS as Namespace };
export default OrderForm;
