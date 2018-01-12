import { ICommunication, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    executing: ICommunication;
  };
  edit: {
    //
  };
  data: {
    //
  };
  ui: {
    //
  };
}

export type ISomeAction = IPlainAction<'FEATURE_NAME:SOME_ACTION'>;

export type Action =
  | ISomeAction;
