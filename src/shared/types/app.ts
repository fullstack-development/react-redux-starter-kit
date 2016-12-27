import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ThunkAction, ActionCreator } from 'redux';
import { Reducer } from 'redux';
import Api from '../api/Api';
import { Namespace as CategorySelectNamespace } from 'features/categorySelect';
import { Namespace as LocationSelectNamespace } from 'features/locationSelect';
import { Namespace as DynamicFieldsNamespace } from 'features/dynamicFields';
import { Namespace as HomeModuleNamespace } from '../../modules/OrderForm/OrderForm';


declare namespace App {

  interface Module<S> {
    getRoutes?: () => ReactElement<Route.RouteProps> | Array<ReactElement<Route.RouteProps>>;
    getReducer?: () => { name: string; reducer: Reducer<S> };
  }

  interface ExtraArguments {
    api: Api;
  }

  interface Action {
    payload?: { [key: string]: any } | number | string | null;
    type: string;
  }


  interface ReduxState {
    categorySelect: CategorySelectNamespace.InitialState;
    locationSelect: LocationSelectNamespace.InitialState;
    dynamicFields: DynamicFieldsNamespace.InitialState;
    orderForm: HomeModuleNamespace.InitialState;
  }

  type AsyncActionCreatorResult = ThunkAction<Promise<void>, ReduxState, ExtraArguments>;
  type AsyncActionCreator = ActionCreator<AsyncActionCreatorResult>;
}

export default App;
