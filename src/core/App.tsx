import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import 'normalize.css';

import { JssProvider, SheetsRegistry } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { IAppData, Module, IJssDependencies } from 'shared/types/app';
import BaseStyles from 'shared/styles/BaseStyles';

import createRoutes from './routes';

interface IAppProps {
  jssDeps: IJssDependencies;
  disableStylesGeneration?: boolean;
}

export function App({ modules, store, jssDeps, disableStylesGeneration }: IAppData & IAppProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderSharedPart(modules, jssDeps, disableStylesGeneration)}
      </BrowserRouter>
    </Provider>
  );
}

interface IServerAppProps {
  jssDeps: IJssDependencies;
  registry?: SheetsRegistry;
  disableStylesGeneration?: boolean;
}

export function ServerApp(props: IAppData & IServerAppProps & StaticRouter['props']) {
  const { modules, store, registry, jssDeps, disableStylesGeneration, ...routerProps } = props;
  return (
    <Provider store={store}>
      <StaticRouter {...routerProps}>
        {renderSharedPart(modules, jssDeps, disableStylesGeneration, registry)}
      </StaticRouter>
    </Provider>
  );
}

function renderSharedPart(
  modules: Array<Module<any>>, jssDeps: IJssDependencies,
  disableStylesGeneration?: boolean,
  registry?: SheetsRegistry,
) {
  const { generateClassName, jss, theme } = jssDeps;

  return (
    <JssProvider
      jss={jss}
      registry={registry}
      generateClassName={generateClassName}
      disableStylesGeneration={disableStylesGeneration}
    >
      <MuiThemeProvider theme={theme} disableStylesGeneration={disableStylesGeneration}>
        {/* <React.StrictMode> */}
        <CssBaseline />
        <BaseStyles />
        {createRoutes(modules)}
        {/* </React.StrictMode> */}
      </MuiThemeProvider>
    </JssProvider>
  );
}
