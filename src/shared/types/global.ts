// Global definitions (you shouldn't import it, it is global scope)
/* tslint:disable */
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(): any;
}

interface SinonStub {
  callsFake: Function;
}

interface WebpackModule {
  hot: boolean;
  accept: Function;
}

declare module 'redux-async-connect';
declare module 'react-geosuggest';
declare module 'normalizr';
declare module '*.scss';
declare module '*.png';
declare module 'shared/*';
declare module 'decko';
declare module 'react-hot-loader';
declare module 'enzyme-adapter-react-16';
