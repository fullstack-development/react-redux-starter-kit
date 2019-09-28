import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(
  state: NS.IReduxState['data'] = initial.data,
  action: NS.IAction,
): NS.IReduxState['data'] {
  switch (action.type) {
    case 'PROFILE:GET_REPOSITORY_SUCCESS':
      return { ...state, repository: action.payload };
    case 'PROFILE:RESET_REPOSITORY':
      return { ...state, repository: null };
    default:
      return state;
  }
}

export default dataReducer;
