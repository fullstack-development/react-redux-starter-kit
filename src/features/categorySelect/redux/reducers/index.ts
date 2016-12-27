import initialState from '../initial';
import { Map, fromJS } from 'immutable';
import AppRedux from 'shared/types/app';
import CategorySelect from '../../namespace';


function reducer(state: CategorySelect.InitialState = initialState, action: AppRedux.Action): CategorySelect.InitialState {
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
