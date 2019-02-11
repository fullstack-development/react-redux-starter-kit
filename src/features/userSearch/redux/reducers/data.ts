import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.IAction): NS.IReduxState['data'] {
  switch (action.type) {
    case 'USER_SEARCH:SEARCH_USER_SUCCESS':
      const { users } = action.payload;
      return { ...state, foundUsers: users };
    case 'USER_SEARCH:LOAD_USER_DETAILS_SUCCESS':
      return { ...state, userDetails: action.payload };
    case 'USER_SEARCH:RESET_USER_DETAILS':
      return { ...state, userDetails: initial.data.userDetails };
    default:
      return state;
  }
}

export default dataReducer;