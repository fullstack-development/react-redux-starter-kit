import { IAppReduxState } from 'shared/types/app';
import { IGithubUser, IDetailedGithubUser } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { ICommunication } from 'shared/types/redux';
import * as NS from '../namespace';

function selectFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.usersSearch;
}

export function selectFoundUsers(state: IAppReduxState): IGithubUser[] {
  return selectFeatureState(state).data.foundUsers;
}

export function selectUserDetails(state: IAppReduxState): IDetailedGithubUser | null {
  return selectFeatureState(state).data.userDetails;
}

export function selectCommunication(
  state: IAppReduxState, name: keyof NS.IReduxState['communication'],
): ICommunication {
  return selectFeatureState(state).communication[name];
}

export function selectUsersSearchPaginationState(state: IAppReduxState): IPaginationState {
  return selectFeatureState(state).ui.usersSearchPaginationState;
}

export function selectTotalResults(state: IAppReduxState): number {
  return selectFeatureState(state).data.totalResults;
}
