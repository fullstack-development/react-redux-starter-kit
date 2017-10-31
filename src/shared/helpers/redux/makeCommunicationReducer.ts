import { ICommunicationState, IAction, IProtect, IFailAction } from './namespace';

export default function makeCommunicationReducer<
  E extends IAction = IProtect,
  C extends IAction = IProtect,
  F extends IFailAction = IProtect
>(
  executeType: E['type'],
  completedType: C['type'],
  failedType: F['type'],
  initial: ICommunicationState<F['error']>,
): (state: ICommunicationState<F['error']>, action: IAction) => ICommunicationState<F['error']> {
  return (state: ICommunicationState<F['error']> = initial, action: IAction) => {
    switch (action.type) {
      case executeType: return { error: '', isRequesting: true };
      case completedType: return { error: '', isRequesting: false };
      case failedType: return { error: (action as F).error, isRequesting: false };
      default: return state;
    }
  };
}
