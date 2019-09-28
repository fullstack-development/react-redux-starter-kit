import * as NS from '../../namespace';
import { ISavedGithubUser } from 'shared/types/models';

export function saveUser(user: ISavedGithubUser): NS.ISaveUser {
  return {
    type: 'PROFILE:SAVE_USER',
    payload: user,
  };
}

export function removeUser(id: number): NS.IRemoveUser {
  return {
    type: 'PROFILE:REMOVE_USER',
    payload: id,
  };
}
