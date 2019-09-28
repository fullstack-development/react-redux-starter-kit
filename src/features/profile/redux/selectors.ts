import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import {
  IProfile,
  ISavedGithubUser,
  ISavedRepository,
} from 'shared/types/models';

import * as NS from '../namespace';

function selectFeatureState(state: IAppReduxState) {
  return state.profile;
}

export function selectProfile(state: IAppReduxState): IProfile {
  return selectFeatureState(state).edit.profile;
}

export function selectUsers(state: IAppReduxState): ISavedGithubUser[] {
  return selectFeatureState(state).users.saved;
}

export function selectRepos(state: IAppReduxState): ISavedRepository[] {
  return selectFeatureState(state).repos.saved;
}

export function selectCommunication(
  state: IAppReduxState,
  name: keyof NS.IReduxState['communication'],
): ICommunication {
  return selectFeatureState(state).communication[name];
}

export function selectLoadedRepository(state: IAppReduxState) {
  return selectFeatureState(state).data.repository;
}
