import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.IAction): NS.IReduxState['data'] {
  switch (action.type) {
    case 'USERS_SEARCH:SEARCH_USERS_SUCCESS':
      const { data, totalResults } = action.payload;
      return { ...state, foundUsers: data, totalResults };
    case 'USERS_SEARCH:LOAD_USER_DETAILS_SUCCESS':
      return { ...state, userDetails: action.payload };
    case 'USERS_SEARCH:RESET_USER_DETAILS':
      return { ...state, userDetails: initial.data.userDetails };
    case 'USERS_SEARCH:RESET_SEARCH_RESULTS':
      return { ...state, foundUsers: initial.data.foundUsers, totalResults: initial.data.totalResults };
    default:
      return state;
  }
}

export default dataReducer;
