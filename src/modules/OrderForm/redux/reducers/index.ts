import initialState from '../initial';
import { Map, fromJS } from 'immutable';
import AppRedux from 'shared/types/app';
import HomeModule from '../../namespace';


function reducer(state: HomeModule.InitialState = initialState, action: AppRedux.Action): HomeModule.InitialState {
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
