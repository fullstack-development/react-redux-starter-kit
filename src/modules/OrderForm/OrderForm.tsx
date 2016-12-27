import * as React from 'react';
import { Route } from 'react-router';
import Layout from './view/Layout/Layout';
import { reducer } from './redux';
import Namespace from './namespace';
import AppNamespace from 'shared/types/app';
import Module = AppNamespace.Module;

class OrderForm implements Module<Namespace.InitialState> {
  getRoutes() {
    return <Route key="order" path="order" component={Layout} />;
  }

  getReducer() {
    return { name: 'orderForm', reducer };
  }
}

export { Namespace };
export default OrderForm;
