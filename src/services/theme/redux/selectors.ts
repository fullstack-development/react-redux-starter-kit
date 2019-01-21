import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';

function selectFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.theme;
}

export function selectUITheme(state: IAppReduxState): NS.UITheme {
  return selectFeatureState(state).data.theme;
}
