import * as React from 'react';
import { Route } from 'react-router-dom';

import * as NS from './namespace';
import { Module, IReduxEntry } from 'shared/types/app';

import { reducer, saga } from './redux';

import Layout from './view/Layout/Layout';

class OrderForm extends Module {
  public getRoutes() {
    return <Route key="order" exact path="/order" component={Layout} />;
  }

  public getReduxEntry(): IReduxEntry {
    return {
      reducers: { orderForm: reducer },
      sagas: [saga],
    };
  }
}

export { NS as Namespace };
export default OrderForm;
