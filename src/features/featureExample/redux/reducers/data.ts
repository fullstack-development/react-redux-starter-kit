import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action) {
  switch (action.type) {
    case 'FEATURE_EXAMPLE:INCREMENT': {
      return {
        ...state,
        count: state.count + 1,
      };
    }
    default: return state;
  }
}
