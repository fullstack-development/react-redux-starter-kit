import { ISaveFields, ISaveFieldsSuccess, ISaveFieldsFail } from '../../namespace';

function saveFields(): ISaveFields {
  return {
    type: 'HOME_MODULE:SAVE_FIELDS',
  };
}

function saveFieldsSuccess(message: string): ISaveFieldsSuccess {
  return {
    type: 'HOME_MODULE:SAVE_FIELDS_SUCCESS',
    payload: message,
  };
}

function saveFieldsFail(error: string): ISaveFieldsFail {
  return {
    type: 'HOME_MODULE:SAVE_FIELDS_FAIL',
    payload: error,
  };
}

export {
  saveFields,
  saveFieldsSuccess,
  saveFieldsFail,
};
