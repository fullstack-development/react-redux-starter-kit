import { IFields } from 'shared/types/models';

import * as NS from '../../namespace';

export function loadFields(uid: number): NS.ILoadFieldsAction {
  return { type: 'DYNAMIC_FIELDS:LOAD_FIELDS', payload: uid };
}

export function loadFieldsCompleted(data: IFields): NS.ILoadFieldsCompletedAction {
  return { type: 'DYNAMIC_FIELDS:LOAD_FIELDS_COMPLETED', payload: data };
}

export function loadFieldsFailed(message: string): NS.ILoadFieldsFailedAction {
  return { type: 'DYNAMIC_FIELDS:LOAD_FIELDS_FAILED', payload: message };
}
