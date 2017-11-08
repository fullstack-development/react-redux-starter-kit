import * as NS from '../../namespace';

export function saveFields(): NS.ISaveFieldsAction {
  return {
    type: 'ORDER_FORM_MODULE:SAVE_FIELDS',
  };
}

export function saveFieldsCompleted(response: NS.IOrderFormResponse): NS.ISaveFieldsCompletedAction {
  return {
    type: 'ORDER_FORM_MODULE:SAVE_FIELDS_COMPLETED',
    payload: response,
  };
}

export function saveFieldsFail(error: string): NS.ISaveFieldsFailedAction {
  return {
    type: 'ORDER_FORM_MODULE:SAVE_FIELDS_FAILED',
    payload: error,
  };
}
