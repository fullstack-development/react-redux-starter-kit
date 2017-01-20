import { initialCommunicationState, initialDataState } from '../data/initial';
import { Map, fromJS } from 'immutable';
import { IAction } from 'shared/types/app';
import { IReduxState, ICommunication, IData } from '../../namespace';
import { combineReducers, Reducer } from 'redux';

function mainReducer(state: IData = initialDataState, { type, payload }: IAction): IData {
  const imState: Map<string, any> = fromJS(state);

  switch (type) {
  case `CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED`:
    return imState.set('options', payload).toJS();
  case ('CATEGORY_SELECT:CATEGORY_SELECTED'):
    return imState.set('selected', payload).toJS();
  default:
    return state;
  }
}

function getCommunicationReducer(actionType: string) {
  return function communicationReducer(
    state: ICommunication = initialCommunicationState,
    { type, payload }: IAction,
  ): ICommunication {
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
