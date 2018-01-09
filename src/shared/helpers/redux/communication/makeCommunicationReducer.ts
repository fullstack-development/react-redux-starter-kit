import { ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

interface IProtectAction {
  type: '';
  error: any;
}

export default function makeCommunicationReducer<
  E extends IPlainAction<string> = IProtectAction,
  C extends IPlainAction<string> = IProtectAction,
  F extends IPlainFailAction<string> = IProtectAction
  >(
  executeType: E['type'],
  completedType: C['type'],
  failedType: F['type'],
  initial: ICommunication<F['error']>,
): (state: ICommunication<F['error']>, action: IPlainAction<string>) => ICommunication<F['error']> {
  return (state: ICommunication<F['error']> = initial, action: IPlainAction<string>) => {
    switch (action.type) {
      case executeType: return { error: '', isRequesting: true };
      case completedType: return { error: '', isRequesting: false };
      case failedType: return { error: (action as F).error, isRequesting: false };
      default: return state;
    }
  };
}
