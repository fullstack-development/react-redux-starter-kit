import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'shared/helpers/redux';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'ORDER_FORM_MODULE:SAVE_FIELDS':
      return { ...state, message: null };
    case 'ORDER_FORM_MODULE:SAVE_FIELDS_SUCCESS':
      return { ...state, message: action.payload.message };
    case 'ORDER_FORM_MODULE:SAVE_FIELDS_FAIL':
      return { ...state, message: null };
    default: return state;
  }
}

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
  communications: combineReducers<NS.IReduxState['communications']>({
    saving: makeCommunicationReducer<NS.ISaveFields, NS.ISaveFieldsSuccess, NS.ISaveFieldsFail>(
      'ORDER_FORM_MODULE:SAVE_FIELDS', 'ORDER_FORM_MODULE:SAVE_FIELDS_SUCCESS', 'ORDER_FORM_MODULE:SAVE_FIELDS_FAIL',
      initial.communications.saving,
    ),
  } as ReducersMap<NS.IReduxState['communications']>),
} as ReducersMap<NS.IReduxState>);
