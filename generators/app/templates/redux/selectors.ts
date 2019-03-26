import { IAppReduxState } from 'core/types';
import * as NS from '../namespace';

export function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.<%= featureName %>;
}
