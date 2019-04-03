import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.IAction): NS.IReduxState['data'] {
  switch (action.type) {
    case 'REPOSITORIES_SEARCH:SEARCH_REPOSITORIES_SUCCESS':
      const { data, totalResults } = action.payload;
      return { ...state, foundRepositories: data, totalResults };
    case 'REPOSITORIES_SEARCH:RESET_SEARCH_RESULTS': {
      return { ...state, foundRepositories: initial.data.foundRepositories, totalResults: initial.data.totalResults };
    }
    default:
      return state;
  }
}

export default dataReducer;
