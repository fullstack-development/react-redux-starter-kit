import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from 'redux';
import createRoutes from './routes';
import { IAppReduxState, Module } from './shared/types/app';

interface IProps {
  modules: Array<Module<any, any>>;
  store: Store<IAppReduxState>;
}

function App({ modules, store }: IProps) {
  return (
    <Provider store={store}>
      <Router>{createRoutes(modules)}</Router>
    </Provider>
  );
}

export default App;
