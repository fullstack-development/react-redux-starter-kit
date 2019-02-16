import { INotification } from 'shared/types/common';
import { IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  edit: {
    notification: INotification | null;
  };
}

export type ISetNotification = IAction<'NOTIFICATION:SET_NOTIFICATION', INotification>;
export type IRemoveNotification = IPlainAction<'NOTIFICATION:REMOVE_NOTIFICATION'>;
export type Action = ISetNotification | IRemoveNotification;
