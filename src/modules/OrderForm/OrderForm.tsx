import * as React from 'react';
import { Route } from 'react-router-dom';
import { reducer } from './redux';
import * as NS from './namespace';
import { getView } from './view/Layout/Layout';
import { Module, IModuleEntryData } from 'shared/types/app';

class OrderForm extends Module<NS.IReduxState, {}> {
  public getRoutes() {
    const entry: IModuleEntryData = getView();
    this.notifyAboutConnection(entry.reducers, entry.sagas);
    return <Route key="order" exact path="/order" component={entry.component} />;
  }

  public getReducer() {
    return { name: 'orderForm', reducer };
  }
}

export { NS as Namespace };
export default OrderForm;
