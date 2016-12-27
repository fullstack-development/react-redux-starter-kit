import AppRedux from 'shared/types/app';
import { Dispatch } from 'redux';


function loadCategories(): AppRedux.AsyncActionCreatorResult {
  return async(
    dispatch: Dispatch<any>,
    getState: Function,
    { api }: AppRedux.ExtraArguments
  ) => {
    dispatch({ type: 'CATEGORY_SELECT:LOAD_CATEGORIES' });

    try {
      const response = await api.loadCategories();
      dispatch({ type: 'CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED', payload: response });
    } catch (err) {
      dispatch({ type: 'CATEGORY_SELECT:LOAD_CATEGORIES_FAILED', payload: err });
      throw err;
    }
  };
}


function chooseCategory(categoryUid: number): AppRedux.Action {
  return {
    type: 'CATEGORY_SELECT:CATEGORY_SELECTED',
    payload: categoryUid,
  };
}

export {
  loadCategories,
  chooseCategory,
};
