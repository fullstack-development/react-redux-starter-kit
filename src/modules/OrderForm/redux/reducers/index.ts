import initialState from '../initial';
import { Map, fromJS } from 'immutable';
import { IAction } from 'shared/types/app';
import { IReduxState } from '../../namespace';

function reducer(state: IReduxState = initialState, action: IAction): IReduxState {
  const imState: Map<string, any> = fromJS(state);

  switch (action.type) {
  case 'HOME_MODULE:SAVE_FIELDS':
    return imState
      .setIn(['communications', 'saving', 'isRequesting'], true)
      .setIn(['data'], null)
      .toJS();
  case 'HOME_MODULE:SAVE_FIELDS_COMPLETED':
    return imState
      .setIn(['communications', 'saving', 'isRequesting'], false)
      .setIn(['communications', 'saving', 'error'], '')
      .setIn(['data'], action.payload)
      .toJS();
  case 'HOME_MODULE:SAVE_FIELDS_FAILED':
    return imState
      .setIn(['communications', 'saving', 'isRequesting'], false)
      .setIn(['communications', 'saving', 'error'], action.payload)
      .setIn(['data'], null)
      .toJS();
  default:
    return state;
  }
}

export default reducer;
