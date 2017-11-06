import { IAction } from 'shared/types/app';
import { IFields } from 'shared/types/models';

function loadFields(uid: number): IAction {
  return { type: 'DYNAMIC_FIELDS:LOAD_FIELDS', payload: uid };
}

function loadFieldsSuccessed(data: IFields): IAction {
  return { type: 'DYNAMIC_FIELDS:LOAD_FIELDS_COMPLETED', payload: data };
}

function loadFieldsFailed(message: string): IAction {
  return { type: 'DYNAMIC_FIELDS:LOAD_FIELDS_FAILED', payload: message };
}

export {
  loadFields,
  loadFieldsFailed,
  loadFieldsSuccessed,
};
