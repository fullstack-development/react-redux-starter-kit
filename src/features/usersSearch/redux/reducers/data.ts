import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.IAction): NS.IReduxState['data'] {
  switch (action.type) {
    case 'USER_SEARCH:SEARCH_USER_SUCCESS':
      const { data } = action.payload;
      return { ...state, foundUsers: data };
    case 'USER_SEARCH:LOAD_USER_DETAILS_SUCCESS':
      return { ...state, userDetails: action.payload };
    case 'USER_SEARCH:RESET_USER_DETAILS':
      return { ...state, userDetails: initial.data.userDetails };
    case 'USER_SEARCH:RESET_SEARCH_RESULTS':
      return { ...state, foundUsers: initial.data.foundUsers };
    default:
      return state;
  }
}

export default dataReducer;
