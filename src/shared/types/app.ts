import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ThunkAction, ActionCreator } from 'redux';
import { Reducer } from 'redux';
import Api from '../api/Api';
import { Namespace as CategorySelectNamespace } from 'features/categorySelect';
import { Namespace as LocationSelectNamespace } from 'features/locationSelect';
import { Namespace as DynamicFieldsNamespace } from 'features/dynamicFields';
import { Namespace as HomeModuleNamespace } from '../../modules/OrderForm/OrderForm';

interface IModule<S> {
  getRoutes?: () => ReactElement<Route.RouteProps> | Array<ReactElement<Route.RouteProps>>;
  getReducer?: () => { name: string; reducer: Reducer<S> };
}

interface IExtraArguments {
  api: Api;
}

interface IAction {
  payload?: { [key: string]: any } | number | string | null;
  type: string;
}

interface IReduxState {
  categorySelect: CategorySelectNamespace.InitialState;
  locationSelect: LocationSelectNamespace.InitialState;
  dynamicFields: DynamicFieldsNamespace.IReduxState;
  orderForm: HomeModuleNamespace.IReduxState;
}

type AsyncActionCreatorResult = ThunkAction<Promise<void>, IReduxState, IExtraArguments>;
type AsyncActionCreator = ActionCreator<AsyncActionCreatorResult>;

export {
  IModule,
  IAction,
  IExtraArguments,
  IReduxState,
  AsyncActionCreator,
  AsyncActionCreatorResult
};
