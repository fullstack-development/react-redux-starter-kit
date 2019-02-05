import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.IAction): NS.IReduxState['data'] {
  switch (action.type) {
    case 'GITHUB_SEARCH:SEARCH_USER_SUCCESS':
      const { users, totalUsers } = action.payload;
      return { ...state, foundUsers: users, totalUsers };
    case 'GITHUB_SEARCH:LOAD_USER_DETAILS_SUCCESS':
      return { ...state, userDetails: action.payload };
    case 'GITHUB_SEARCH:RESET_USER_DETAILS':
      return { ...state, userDetails: initial.data.userDetails };
    default:
      return state;
  }
}

export default dataReducer;
