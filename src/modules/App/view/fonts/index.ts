declare const require: { context(path: string, isRecursive: boolean, regExp: RegExp): void };
require.context('./Roboto', false, /^\.\//);

// to redeclare require properly need make this file a modular in ts
export default null;
