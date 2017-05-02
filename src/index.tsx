import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';
import configureApp from './configureApp';
import App from './App';

// Needed for onTouchTap: http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const appData = configureApp();
const render = (component: React.ReactElement<any>) => ReactDOM.render(
  <AppContainer>{component}</AppContainer>,
  document.getElementById('root'),
);

/* Start application */
render(<App modules={appData.modules} store={appData.store} />);

/* Hot Module Replacement API */
if ((module as any).hot && process.env.NODE_ENV !== 'production') {
  (module as any).hot.accept(['./App', './configureApp'], () => {
    const nextConfigureModules: typeof configureApp = require('./configureApp').default;
    const NextApp: typeof App = require('./App').default;
    const nextAppData = nextConfigureModules(appData);
    render(<NextApp modules={nextAppData.modules} store={nextAppData.store} />);
  });
}
