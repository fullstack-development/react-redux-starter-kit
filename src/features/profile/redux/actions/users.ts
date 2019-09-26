import * as NS from '../../namespace';
import { IDetailedGithubUser } from 'shared/types/models';

export function saveUser(user: IDetailedGithubUser): NS.ISaveUser {
  return {
    type: 'PROFILE:SAVE_USER',
    payload: user,
  };
}

export function removeUser(userId: number): NS.IRemoveUser {
  return {
    type: 'PROFILE:REMOVE_USER',
    payload: userId,
  };
}
