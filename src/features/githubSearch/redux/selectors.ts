import { IAppReduxState } from 'shared/types/app';
import { IUser } from 'shared/types/models';
import * as NS from '../namespace';

function selectFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.githubSearch;
}

export function selectFoundUsers(state: IAppReduxState): IUser[] {
  return selectFeatureState(state).data.foundUsers;
}
