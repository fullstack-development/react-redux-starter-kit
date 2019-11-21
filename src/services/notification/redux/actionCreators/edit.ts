import { INotification } from 'shared/types/common';

import * as NS from '../../namespace';

export function setNotification(notification: INotification): NS.ISetNotification {
  return { type: 'NOTIFICATION:SET_NOTIFICATION', payload: notification };
}

export function removeNotification(): NS.IRemoveNotification {
  return { type: 'NOTIFICATION:REMOVE_NOTIFICATION' };
}
