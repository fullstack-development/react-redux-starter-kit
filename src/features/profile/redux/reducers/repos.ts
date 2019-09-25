import * as NS from '../../namespace';
import initial from '../initial';

function reposReducer(
  state: NS.IReduxState['repos'] = initial.repos,
  { type, payload }: any,
): NS.IReduxState['repos'] {
  switch (type) {
    case 'PROFILE:SAVE_REPO':
      return {
        ...state,
        saved: state.saved.concat(payload),
      };
    case 'PROFILE:REMOVE_REPO':
      return {
        ...state,
        saved: state.saved.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
}

export default reposReducer;
