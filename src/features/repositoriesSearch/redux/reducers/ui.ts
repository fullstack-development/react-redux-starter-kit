import * as NS from '../../namespace';
import initial from '../initial';

function uiReducer(state: NS.IReduxState['ui'] = initial.ui, action: NS.IAction): NS.IReduxState['ui'] {
  switch (action.type) {
    case 'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES_SUCCESS':
      const { totalPages, page } = action.payload;
      return { ...state, repositoriesSearchPaginationState: { totalPages, page } };
    default:
      return state;
  }
}

export default uiReducer;
