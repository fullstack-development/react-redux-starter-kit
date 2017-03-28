import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import createRoutes from './routes';
import { HomeModule, OrderFormModule } from './modules';
import configureStore, { createReducer } from './configureStore';
import { Module, IReducerData, IDependencies, RootSaga } from './shared/types/app';
import Api from './shared/api/Api';

// Needed for onTouchTap: http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/* Prepare main app elements */
const modules = {
  home: new HomeModule(),
  tenders: new OrderFormModule(),
  toArray(): Array<Module<any, any>> {
    return Object.keys(this).filter(key => key !== 'toArray').map(key => this[key]);
  },
};

const modulesArray = modules.toArray();
const dependencies = { api: new Api('/api') };
const connectedSagas: RootSaga[] = [];
const connectedReducers: Array<IReducerData<any>> = [];

modulesArray.forEach((module: Module<any, any>) => module.onConnectRequest = onModuleConnectRequest);

const { store, runSaga } = configureStore(modulesArray, dependencies);
const routes = createRoutes(modulesArray);
const rootComponent = (
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>
);

function onModuleConnectRequest(reducers: Array<IReducerData<any>>, sagas: RootSaga[]) {
  reducers.forEach((reducer: IReducerData<any>) => {
    if (!connectedReducers.find((r: IReducerData<any>) => r.name === reducer.name)) {
      connectedReducers.push(reducer);
    }
  });

  sagas.forEach((saga: RootSaga) => {
    if (!connectedSagas.includes(saga)) {
      runSaga(saga(dependencies));
      connectedSagas.push(saga);
    }
  });

  const newReducer = createReducer(modulesArray, connectedReducers);
  store.replaceReducer(newReducer);
}

/* Start application */
ReactDOM.render(rootComponent, document.getElementById('root'));
