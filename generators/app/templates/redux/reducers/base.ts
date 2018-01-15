import * as NS from '../../namespace';
import { initial } from '../initial';

export function <%= partName %>Reducer(state: NS.IReduxState['<%= partName %>'] = initial.<%= partName %>, action: NS.Action): NS.IReduxState['<%= partName %>'] {
  switch (action.type) {
    case '': {
      return state;
    }
    default: return state;
  }
}
