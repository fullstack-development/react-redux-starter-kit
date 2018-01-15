import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';

export function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.<%= featureName %>;
}
