import * as NS from '../../namespace';

export function saveFields(): NS.ISaveFieldsAction {
  return {
    type: 'ORDER_FORM_MODULE:SAVE_FIELDS',
  };
}

export function saveFieldsCompleted(message: string): NS.ISaveFieldsCompletedAction {
  return {
    type: 'ORDER_FORM_MODULE:SAVE_FIELDS_COMPLETED',
    payload: message,
  };
}

export function saveFieldsFail(error: string): NS.ISaveFieldsFailedAction {
  return {
    type: 'ORDER_FORM_MODULE:SAVE_FIELDS_FAILED',
    payload: error,
  };
}
