import { IAppReduxState } from 'shared/types/app';
import { IUser, IDetailedUser } from 'shared/types/models';
import { ICommunication } from 'shared/types/redux';
import * as NS from '../namespace';

function selectFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.githubSearch;
}

export function selectFoundUsers(state: IAppReduxState): IUser[] {
  return selectFeatureState(state).data.foundUsers;
}

export function selectUserDetails(state: IAppReduxState): IDetailedUser | null {
  return selectFeatureState(state).data.userDetails;
}

export function selectCommunication(
  state: IAppReduxState, name: keyof NS.IReduxState['communication'],
): ICommunication {
  return selectFeatureState(state).communication[name];
}
