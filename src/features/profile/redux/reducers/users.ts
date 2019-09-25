import * as NS from '../../namespace';
import initial from '../initial';

function usersReducer(
  state: NS.IReduxState['users'] = initial.users,
  { type, payload }: any,
): NS.IReduxState['users'] {
  switch (type) {
    case 'PROFILE:SAVE_USER':
      return {
        ...state,
        saved: state.saved.concat(payload),
      };
    case 'PROFILE:REMOVE_USER':
      return {
        ...state,
        saved: state.saved.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
}

export default usersReducer;
