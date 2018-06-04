import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

import { create } from 'jss';
import jssCompose from 'jss-compose';
import JssProvider from 'react-jss/lib/JssProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue } from '@material-ui/core/colors';
import { createGenerateClassName, jssPreset, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { IAppData, Module } from 'shared/types/app';

import createRoutes from './routes';

export function App({ modules, store }: IAppData) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderSharedPart(modules)}
      </BrowserRouter>
    </Provider>
  );
}

export function ServerApp({ modules, store, ...routerProps }: IAppData & StaticRouter['props']) {
  return (
    <Provider store={store}>
      <StaticRouter {...routerProps}>
        {renderSharedPart(modules)}
      </StaticRouter>
    </Provider>
  );
}

// Place to add jss-plugins [https://material-ui.com/customization/css-in-js/#plugins]
const jss = create({ plugins: [...jssPreset().plugins, jssCompose()] });
const generateClassName = createGenerateClassName();

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

function renderSharedPart(modules: Array<Module<any>>) {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <React.StrictMode>
          <CssBaseline />
          {createRoutes(modules)}
        </React.StrictMode>
      </MuiThemeProvider>
    </JssProvider>
  );
}
