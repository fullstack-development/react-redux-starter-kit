import * as React from 'react';
import { ROUTES_PREFIX } from 'core/constants';
import { reducer, saga } from './redux';

import { Module, IReduxEntry } from 'shared/types/app';
import * as NS from './namespace';

import { Route } from 'react-router-dom';
import Layout from './view/Layout/Layout';

class OrderForm extends Module {
  public getRoutes() {
    return <Route key="order" exact path={`${ROUTES_PREFIX}/order`} component={Layout} />;
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
