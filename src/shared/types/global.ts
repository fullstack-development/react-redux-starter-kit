// Global definitions (you shouldn't import it, it is global scope)
/* tslint:disable */
interface Window {
  devToolsExtension: Function;
}
interface Environment {
  NODE_ENV: string;
  __HOST__: string;
}

interface Process {
  env: Environment;
}

interface Require {
  context: Function;
}

declare const process: Process;
declare const require: Require;

declare module 'reselect';
declare module 'redux-async-connect';
declare module 'react-tap-event-plugin';
declare module 'react-geosuggest';
declare module 'bem-cn';
declare module 'normalizr';
declare module '*.styl';
declare module '*.png';
declare module 'shared/*';
