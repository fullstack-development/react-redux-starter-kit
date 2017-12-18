import * as NS from '../../namespace';

export function saveFields(payload: NS.ISaveFieldsRequest): NS.ISaveFieldsAction {
  return {
    type: 'ORDER_FORM_MODULE:SAVE_FIELDS',
    payload,
  };
}

export function saveFieldsCompleted(payload: NS.ISaveFieldsResponse): NS.ISaveFieldsCompletedAction {
  return {
    type: 'ORDER_FORM_MODULE:SAVE_FIELDS_COMPLETED',
    payload,
  };
}

export function saveFieldsFail(error: string): NS.ISaveFieldsFailedAction {
  return {
    type: 'ORDER_FORM_MODULE:SAVE_FIELDS_FAILED',
    payload: error,
  };
}
