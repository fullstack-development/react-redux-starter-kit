import { ICommunicationState, IPlainAction, IProtect, IPlainFailAction } from '../namespace';

export default function makeCommunicationReducer<
  E extends IPlainAction<string> = IProtect,
  C extends IPlainAction<string> = IProtect,
  F extends IPlainFailAction<string> = IProtect
  >(
  executeType: E['type'],
  completedType: C['type'],
  failedType: F['type'],
  initial: ICommunicationState<F['error']>,
): (state: ICommunicationState<F['error']>, action: IPlainAction<string>) => ICommunicationState<F['error']> {
  return (state: ICommunicationState<F['error']> = initial, action: IPlainAction<string>) => {
    switch (action.type) {
      case executeType: return { error: '', isRequesting: true };
      case completedType: return { error: '', isRequesting: false };
      case failedType: return { error: (action as F).error, isRequesting: false };
      default: return state;
    }
  };
}
