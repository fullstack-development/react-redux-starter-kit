import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.IAction): NS.IReduxState['data'] {
  switch (action.type) {
    case 'REPOSITORY_SEARCH:SEARCH_REPOSITORIES_SUCCESS':
      return { ...state, foundRepositories: action.payload.repositories };
    default:
      return state;
  }
}

export default dataReducer;
