import * as actions from './actions';
import { reducer } from './reducer';
import { multiConnect } from './multiConnect';
import { multiReducer } from './multiReducer';

export { actions, reducer, multiConnect, multiReducer };
export { IMultiAction, IMultiInstanceState } from './namespace';
