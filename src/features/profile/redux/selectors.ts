import { IAppReduxState } from 'core/types';
import { IProfile } from 'shared/types/models';

function selectFeatureState(state: IAppReduxState) {
  return state.profile;
}

export function selectProfile(state: IAppReduxState): IProfile {
  return selectFeatureState(state).edit.profile;
}
