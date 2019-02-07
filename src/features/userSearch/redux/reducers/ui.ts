import * as NS from '../../namespace';
import initial from '../initial';

function uiReducer(state: NS.IReduxState['ui'] = initial.ui, action: NS.IAction): NS.IReduxState['ui'] {
  switch (action.type) {
    case 'USER_SEARCH:SEARCH_USER_SUCCESS':
      const { totalPages, page } = action.payload;
      return { ...state, userSearchPaginationState: { totalPages, page } };
    default:
      return state;
  }
}

export default uiReducer;
