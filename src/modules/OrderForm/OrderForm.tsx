import * as React from 'react';
import { Route, RouterState, RouteComponent } from 'react-router';
import { bind } from 'decko';
import { reducer } from './redux';
import * as Namespace from './namespace';
import { Module, IReducerData } from 'shared/types/app';

class OrderForm extends Module<Namespace.IReduxState> {
  public getRoutes() {
    return <Route key="order" path="order" getComponent={this.getLayoutComponent} />;
  }

  public getReducer() {
    return { name: 'orderForm', reducer };
  }

  private notifyAboutConnection(reducers: Array<IReducerData<any>>, saga: Function) {
    if (this.onConnectRequestHandler) {
      this.onConnectRequestHandler(reducers, saga);
    }
  }

  @bind
  private getLayoutComponent(nextState: RouterState, cb: (error: any, component?: RouteComponent) => void) {
    (require as any).ensure([], () => {
      const view = require('./view/Layout/Layout').getView();
      this.notifyAboutConnection(view.reducers, view.saga);
      cb(null, view.component);
    });
  }
}

export { Namespace };
export default OrderForm;
