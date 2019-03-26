import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import 'normalize.css';

import { ThemeProvider } from 'services/theme';
import { JssProvider, SheetsRegistry } from 'shared/styles';

import { reactAppWrappers } from 'config';
import { IJssDependencies, IAppData } from '../types';
import Routes from './Routes';

interface IAppProps {
  jssDeps: IJssDependencies;
  disableStylesGeneration?: boolean;
}

function ClientApp({ deps, jssDeps, disableStylesGeneration }: IAppData & IAppProps) {
  return (
    <Provider store={deps.store}>
      <BrowserRouter>
        {renderSharedPart(jssDeps, disableStylesGeneration)}
      </BrowserRouter>
    </Provider>
  );
}

export const App = hot(ClientApp);

interface IServerAppProps {
  jssDeps: IJssDependencies;
  registry?: SheetsRegistry;
  disableStylesGeneration?: boolean;
}

export function ServerApp(props: IAppData & IServerAppProps & StaticRouter['props']) {
  const { deps, registry, jssDeps, disableStylesGeneration, ...routerProps } = props;
  return (
    <Provider store={deps.store}>
      <StaticRouter {...routerProps}>
        {renderSharedPart(jssDeps, disableStylesGeneration, registry)}
      </StaticRouter>
    </Provider>
  );
}

function renderSharedPart(
  jssDeps: IJssDependencies,
  disableStylesGeneration?: boolean,
  registry?: SheetsRegistry,
) {
  const { generateClassName, jss } = jssDeps;

  return (
    <JssProvider
      jss={jss}
      registry={registry}
      generateClassName={generateClassName}
      disableStylesGeneration={disableStylesGeneration}
    >
      <ThemeProvider disableStylesGeneration={disableStylesGeneration}>
        {renderWrappers(reactAppWrappers, <Routes />)}
      </ThemeProvider>
    </JssProvider>
  );
}

function renderWrappers(wraps: typeof reactAppWrappers, child: React.ReactElement) {
  if (wraps.length === 0) {
    return child;
  }
  const Cur = wraps[0];
  return <Cur>{renderWrappers(wraps.slice(1), child)}</Cur>;
}
