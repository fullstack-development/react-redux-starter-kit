import * as NS from '../../namespace';
import { IDetailedGithubUser } from 'shared/types/models';

export function saveUser(payload: IDetailedGithubUser): NS.ISaveUser {
  return {
    type: 'PROFILE:SAVE_USER',
    payload,
  };
}

export function removeUser(payload: number): NS.IRemoveUser {
  return {
    type: 'PROFILE:REMOVE_USER',
    payload,
  };
}
