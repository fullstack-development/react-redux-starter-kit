import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: saveFields, completed: saveFieldsSuccess, failed: saveFieldsFail } =
  makeCommunicationActionCreators<NS.ISaveFields, NS.ISaveFieldsSuccess, NS.ISaveFieldsFail>(
    'ORDER_FORM_MODULE:SAVE_FIELDS', 'ORDER_FORM_MODULE:SAVE_FIELDS_SUCCESS', 'ORDER_FORM_MODULE:SAVE_FIELDS_FAIL',
  );
