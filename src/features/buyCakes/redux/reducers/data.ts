import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.IAction): NS.IReduxState['data'] {
  switch (action.type) {
    case 'BUY_CAKES:LOAD_CAKES_PREVIEW_SUCCESS':
      return { ...state, cakesPreview: action.payload };
    default:
      return state;
  }
}

export default dataReducer;
