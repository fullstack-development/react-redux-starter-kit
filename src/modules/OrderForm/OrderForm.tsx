import * as React from 'react';
import { Route } from 'react-router';
import Layout from './view/Layout/Layout';
import { reducer } from './redux';
import * as Namespace from './namespace';
import { IModule } from 'shared/types/app';

class OrderForm implements IModule<Namespace.IReduxState> {
  public getRoutes() {
    return <Route key="order" path="order" component={Layout} />;
  }

  public getReducer() {
    return { name: 'orderForm', reducer };
  }
}

export { Namespace };
export default OrderForm;
