import initialState from '../data/initial';
import { Map, fromJS } from 'immutable';
import { IAction } from 'shared/types/app';
import { IReduxState } from '../../namespace';

function reducer(state: IReduxState = initialState, action: IAction): IReduxState {
  const imState: Map<string, any> = fromJS(state);

  switch (action.type) {
  case ('CATEGORY_SELECT:LOAD_CATEGORIES'):
    return imState.setIn(['communications', 'categoriesFetching', 'isRequesting'], true).toJS();
  case ('CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED'):
    return imState
      .setIn(['communications', 'categoriesFetching', 'isRequesting'], false)
      .setIn(['communications', 'categoriesFetching', 'error'], '')
      .setIn(['data', 'options'], action.payload)
      .toJS();
  case ('CATEGORY_SELECT:LOAD_CATEGORIES_FAILED'):
    return imState
      .setIn(['communications', 'categoriesFetching', 'isRequesting'], false)
      .setIn(['communications', 'categoriesFetching', 'error'], action.payload)
      .toJS();
  case ('CATEGORY_SELECT:CATEGORY_SELECTED'):
    return imState
      .setIn(['data', 'selected'], action.payload)
      .toJS();
  default:
    return state;
  }
}

export default reducer;
