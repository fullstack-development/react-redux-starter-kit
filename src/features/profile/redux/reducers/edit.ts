import * as NS from '../../namespace';
import initial from '../initial';

function editReducer(state: NS.IReduxState['edit'] = initial.edit, action: any): NS.IReduxState['edit'] {
  switch (action.type) {
    case 'PROFILE:SAVE_PROFILE': {
      return {
        ...state,
        profile: action.payload,
      };
    }
    default:
      return state;
  }
}

export default editReducer;
