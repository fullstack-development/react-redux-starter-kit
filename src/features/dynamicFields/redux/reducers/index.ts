// import { IPlainAction } from 'shared/types/app';
import initialState from '../data/initial';
import { Map, fromJS } from 'immutable';
import { IReduxState, DynamicFieldsAction } from '../../namespace';

function reducer(state: IReduxState = initialState, action: DynamicFieldsAction): IReduxState {
  const imState: Map<string, any> = fromJS(state);
  switch (action.type) {
    case 'DYNAMIC_FIELDS:LOAD_FIELDS':
      return imState
        .setIn(['communications', 'fetching', 'isRequesting'], true)
        .setIn(['data', 'fields', 'uid'], action.payload)
        .setIn(['data', 'fields', 'values'], {})
        .toJS();
    case 'DYNAMIC_FIELDS:LOAD_FIELDS_COMPLETED':
      return imState
        .setIn(['communications', 'fetching', 'isRequesting'], false)
        .setIn(['communications', 'fetching', 'error'], '')
        .setIn(['data', 'fields'], action.payload)
        .toJS();
    case 'DYNAMIC_FIELDS:LOAD_FIELDS_FAILED':
      return imState
        .setIn(['communications', 'fetching', 'isRequesting'], false)
        .setIn(['communications', 'fetching', 'error'], action.payload)
        .toJS();
    case 'DYNAMIC_FIELDS:CHANGE_FIELD_VALUE': {
      interface IData { name: string; value: string; }
      const payload = action.payload as IData;
      return imState.setIn(['data', 'values', payload.name], payload.value).toJS();
    }
    default:
      return state;
  }
}

export default reducer as (state: IReduxState, action: any) => IReduxState;
