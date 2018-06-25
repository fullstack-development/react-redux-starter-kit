import * as React from 'react';
import { ROUTES_PREFIX } from 'core/constants';
import { Route } from 'react-router-dom';

import BaseLayout from 'modules/shared/BaseLayout/BaseLayout';
import { Module, IReduxEntry } from 'shared/types/app';

import * as NS from './namespace';
import { reducer, saga } from './redux';
import Layout from './view/Layout/Layout';

class OrderForm extends Module {
  public getRoutes() {
    return (
      <Route key="order" exact path={`${ROUTES_PREFIX}/order`}>
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
