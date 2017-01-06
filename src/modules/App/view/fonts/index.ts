declare const require: { context: Function };
require.context('./Roboto', false, /^\.\//);

// to redeclare require properly need make this file a modular in ts
export default null;
