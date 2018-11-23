import initial from '../data/initial';
import * as NS from '../../namespace';
import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'DYNAMIC_FIELDS:LOAD_FIELDS':
      return {
        ...state,
        values: {},
        fields: {
          ...state.fields,
          uid: action.payload,
        },
      };
    case 'DYNAMIC_FIELDS:LOAD_FIELDS_SUCCESS':
      return {
        ...state,
        fields: action.payload,
      };
    case 'DYNAMIC_FIELDS:CHANGE_FIELD_VALUE': {
      interface IData { name: string; value: string; }
      const payload = action.payload as IData;
      return {
        ...state,
        values: {
          ...state.values,
          [payload.name]: payload.value,
        },
      };
    }
    default:
      return state;
  }
}

export default combineReducers<NS.IReduxState>({
  communication: combineReducers({
    fetching: makeCommunicationReducer<NS.ILoadFields, NS.ILoadFieldsSuccess, NS.ILoadFieldsFail>(
      'DYNAMIC_FIELDS:LOAD_FIELDS', 'DYNAMIC_FIELDS:LOAD_FIELDS_SUCCESS', 'DYNAMIC_FIELDS:LOAD_FIELDS_FAIL',
      initial.communication.fetching,
    ),
  }),
  data: dataReducer,
});
