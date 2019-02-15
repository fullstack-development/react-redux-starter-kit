import { IAppReduxState } from 'shared/types/app';
import * as NS from '../../namespace';

function selectServiceState(state: IAppReduxState): NS.IReduxState {
  if (!state.notification) {
    throw new Error('Cannot find notification service state!');
  }

  return state.notification;
}

export function selectNotification(state: IAppReduxState) {
  return selectServiceState(state).edit.notification;
}
