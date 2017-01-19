import { IAction } from 'shared/types/app';
import { IFieldsResponse } from 'shared/api/Api';

function loadFields(uid: number): IAction {
  return { type: 'DYNAMIC_FIELDS:LOAD_FIELDS', payload: uid };
}

function loadFieldsSuccessed(data: IFieldsResponse) {
  return { type: 'DYNAMIC_FIELDS:LOAD_FIELDS_COMPLETED', payload: data };
}

function loadFieldsFailed(message: string) {
  return { type: 'DYNAMIC_FIELDS:LOAD_FIELDS_FAILED', payload: message };
}

export {
  loadFields,
  loadFieldsFailed,
  loadFieldsSuccessed,
};
