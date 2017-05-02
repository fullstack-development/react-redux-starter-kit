import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createRoutes from './routes';
import { Module, IReduxState } from './shared/types/app';

interface IProps {
  modules: Array<Module<any, any>>;
  store: Store<IReduxState>;
}

function App({ modules, store }: IProps) {
  return (
    <Provider store={store}>
      <Router>{createRoutes(modules)}</Router>
    </Provider>
  );
}

export default App;
