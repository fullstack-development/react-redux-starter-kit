/* tslint:disable no-empty-interface*/
interface IReduxState {}

type StateSelector = (state: { [key: string]: any }) => IReduxState;

export {
  IReduxState,
  StateSelector,
};
