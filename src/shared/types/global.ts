// Global definitions (you shouldn't import it, it is global scope)
/* tslint:disable */
interface Window {
  devToolsExtension: Function;
}

interface SinonStub {
  callsFake: Function;
}

interface WebpackModule {
  hot: boolean;
  accept: Function;
}


declare module 'reselect';
declare module 'redux-async-connect';
declare module 'react-tap-event-plugin';
declare module 'react-geosuggest';
declare module 'bem-cn';
declare module 'normalizr';
declare module '*.scss';
declare module '*.png';
declare module 'shared/*';
declare module 'decko';
declare module 'react-hot-loader';
