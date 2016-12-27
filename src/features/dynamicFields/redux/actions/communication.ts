import AppRedux from 'shared/types/app';
import { Dispatch } from 'redux';


function loadFields(uid: number): AppRedux.AsyncActionCreatorResult {
  return async(
    dispatch: Dispatch<any>,
    getState: Function,
    { api }: AppRedux.ExtraArguments
  ) => {
    dispatch({ type: 'DYNAMIC_FIELDS:LOAD_FIELDS', payload: uid });
    try {
      const response = await api.loadFields(uid);
      dispatch({ type: 'DYNAMIC_FIELDS:LOAD_FIELDS_COMPLETED', payload: response });
    } catch (err) {
      dispatch({ type: 'DYNAMIC_FIELDS:LOAD_FIELDS_FAILED', payload: err });
      throw err;
    }
  };
}


export {
  loadFields,
};
