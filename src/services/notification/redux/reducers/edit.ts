import * as NS from '../../namespace';
import initial from '../data/initial';

function editReducer(state: NS.IReduxState['edit'] = initial.edit, action: NS.Action): NS.IReduxState['edit'] {
  switch (action.type) {
    case 'NOTIFICATION:SET_NOTIFICATION': {
      return { ...state, notification: action.payload };
    }
    case 'NOTIFICATION:REMOVE_NOTIFICATION': {
      return { ...state, notification: null };
    }
    default: {
      return state;
    }
  }
}

export default editReducer;
