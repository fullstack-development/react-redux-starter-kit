import { IAppReduxState } from 'shared/types/app';
import { IProfile } from 'shared/types/models';
import { IDetailedGithubUser, IRepository } from 'shared/types/models';

function selectFeatureState(state: IAppReduxState) {
  return state.profile;
}

export function selectProfile(state: IAppReduxState): IProfile {
  return selectFeatureState(state).edit.profile;
}

export function selectUsers(state: IAppReduxState): Array<IDetailedGithubUser> {
  return selectFeatureState(state).users.saved;
}

export function selectRepos(state: IAppReduxState): Array<IRepository> {
  return selectFeatureState(state).repos.saved;
}
