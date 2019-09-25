import { IDetailedGithubUser } from 'shared/types/models';

export const saveUser = (user: IDetailedGithubUser) => ({
  type: 'PROFILE:SAVE_USER',
  payload: user,
});

export const removeUser = (id: number) => ({
  type: 'PROFILE:REMOVE_USER',
  payload: id,
});
