import * as React from 'react';
import { Route } from 'react-router-dom';

import BaseLayout from 'modules/shared/BaseLayout/BaseLayout';
import { Module, IReduxEntry } from 'shared/types/app';

import { routes } from './constants';
import * as NS from './namespace';
import { reducer, saga } from './redux';
import Layout from './view/Layout/Layout';

class OrderForm extends Module {
  public getRoutes() {
    return (
      <Route
        key={routes.order.getElementKey()}
        exact
        path={routes.order.getRoutePath()}
      >
        {props => (
          <BaseLayout>
            <Layout {...props} />
          </BaseLayout>
        )}
      </Route>
    );
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
