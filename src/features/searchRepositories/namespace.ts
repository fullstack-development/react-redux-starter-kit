interface IReduxState {}

type StateSelector = (state: { [key: string]: any }) => IReduxState;

export {
  IReduxState,
  StateSelector,
};
