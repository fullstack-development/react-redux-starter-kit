import initialState from '../initial';
import { Map, fromJS } from 'immutable';
import { IReduxState, OrderFormAction } from '../../namespace';

function reducer(state: IReduxState = initialState, action: OrderFormAction): IReduxState {
  const imState: Map<string, any> = fromJS(state);

  switch (action.type) {
    case 'ORDER_FORM_MODULE:SAVE_FIELDS':
      return imState
        .setIn(['communications', 'saving', 'isRequesting'], true)
        .setIn(['data'], null)
        .toJS();
    case 'ORDER_FORM_MODULE:SAVE_FIELDS_COMPLETED':
      return imState
        .setIn(['communications', 'saving', 'isRequesting'], false)
        .setIn(['communications', 'saving', 'error'], '')
        .setIn(['data'], { message: action.payload })
        .toJS();
    case 'ORDER_FORM_MODULE:SAVE_FIELDS_FAILED':
      return imState
        .setIn(['communications', 'saving', 'isRequesting'], false)
        .setIn(['communications', 'saving', 'error'], action.payload)
        .setIn(['data'], null)
        .toJS();
    default:
      return state;
  }
}

export default reducer as (state: IReduxState, action: { type: string }) => IReduxState;
// export default reducer as any;
