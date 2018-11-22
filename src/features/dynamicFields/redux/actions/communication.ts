import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'redux-make-communication';

export const { execute: loadFields, completed: loadFieldsSuccess, failed: loadFieldsFail } =
  makeCommunicationActionCreators<NS.ILoadFields, NS.ILoadFieldsSuccess, NS.ILoadFieldsFail>(
    'DYNAMIC_FIELDS:LOAD_FIELDS', 'DYNAMIC_FIELDS:LOAD_FIELDS_SUCCESS', 'DYNAMIC_FIELDS:LOAD_FIELDS_FAIL',
  );
