import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'THEME:SET_THEME': {
      return {
        ...state,
        theme: action.payload,
      };
    }
    default: return state;
  }
}

export default dataReducer;
