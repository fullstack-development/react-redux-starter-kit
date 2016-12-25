import { ReactElement } from 'react';
import { Route } from 'react-router';
import { ThunkAction, ActionCreator } from 'redux';
import { Reducer } from 'redux';

declare namespace App {

  interface Module<S> {
    getRoutes?: () => ReactElement<Route.RouteProps> | Array<ReactElement<Route.RouteProps>>;
    getReducer?: () => { name: string; reducer: Reducer<S> };
  }

  interface ExtraArguments {}

  interface Action {
    payload?: { [key: string]: any } | number | string | null;
    type: string;
  }


  interface ReduxState {
    // home: HomeModuleNamespace.InitialState;
  }

  type AsyncActionCreatorResult = ThunkAction<Promise<void>, ReduxState, ExtraArguments>;
  type AsyncActionCreator = ActionCreator<AsyncActionCreatorResult>;
}

export default App;
