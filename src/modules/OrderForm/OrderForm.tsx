import * as React from 'react';
import { Route, RouterState, RouteComponent } from 'react-router';
import { bind } from 'decko';
import { reducer } from './redux';
import * as NS from './namespace';
import { Module, IReducerData, RootSaga, IModuleEntryData } from 'shared/types/app';

class OrderForm extends Module<NS.IReduxState, {}> {
  public getRoutes() {
    return <Route key="order" path="order" getComponent={this.getLayoutComponent} />;
  }

  public getReducer() {
    return { name: 'orderForm', reducer };
  }

  protected notifyAboutConnection(reducers: Array<IReducerData<any>>, sagas: RootSaga[]) {
    if (this.onConnectRequestHandler) {
      this.onConnectRequestHandler(reducers, sagas);
    }
  }

  @bind
  private getLayoutComponent(nextState: RouterState, cb: (error: any, component?: RouteComponent) => void) {
    (require as any).ensure([], () => {
      const entry: IModuleEntryData = require('./view/Layout/Layout').getView();
      this.notifyAboutConnection(entry.reducers, entry.sagas);
      cb(null, entry.component);
    });
  }
}

export { NS as Namespace };
export default OrderForm;
