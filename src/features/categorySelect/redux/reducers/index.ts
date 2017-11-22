import { Map, fromJS } from 'immutable';
import { combineReducers, Reducer } from 'redux';
import { initialCommunicationState, initialDataState } from '../data/initial';

import { ICommunicationState } from 'shared/helpers/redux';
import { IReduxState, IData, CategorySelectAction } from '../../namespace';

function mainReducer(state: IData = initialDataState, action: CategorySelectAction): IData {
  const imState: Map<string, any> = fromJS(state);

  switch (action.type) {
    case 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED':
      return imState.set('options', action.payload).toJS();
    case 'CATEGORY_SELECT:CHOOSE_CATEGORY':
      return imState.set('selected', action.payload).toJS();
    default:
      return state;
  }
}

function getCommunicationReducer(actionType: string) {
  return function communicationReducer(
    state: ICommunicationState = initialCommunicationState,
    { type, payload }: any,
  ): ICommunicationState {
    const imState: Map<string, any> = fromJS(state);

    switch (type) {
      case `CATEGORY_SELECT:${actionType}`:
        return imState.set('isRequesting', true).set('error', '').toJS();
      case `CATEGORY_SELECT:${actionType}_COMPLETED`:
        return imState.set('isRequesting', false).toJS();
      case `CATEGORY_SELECT:${actionType}_FAILED`:
        return imState.set('isRequesting', false).set('error', payload).toJS();
      default: return state;
    }
  };
}

const reducer: Reducer<IReduxState> = combineReducers<IReduxState>({
  communications: combineReducers({
    categoriesFetching: getCommunicationReducer('LOAD_CATEGORIES'),
  }),
  data: mainReducer,
});

export { getCommunicationReducer };
export default reducer;
