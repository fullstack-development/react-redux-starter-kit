import { IDetailedGithubUser } from 'shared/types/models';

export const addUser = (user: IDetailedGithubUser) => ({
  type: 'PROFILE:ADD_USER',
  payload: user,
});

export const removeUser = (id: string) => ({
  type: 'PROFILE:REMOVE_USER',
  payload: id,
});
