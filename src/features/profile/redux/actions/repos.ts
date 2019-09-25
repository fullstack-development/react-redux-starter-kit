import { IRepository } from 'shared/types/models';

export const addRepo = (user: IRepository) => ({
  type: 'PROFILE:ADD_REPO',
  payload: user,
});

export const removeRepo = (id: string) => ({
  type: 'PROFILE:REMOVE_REPO',
  payload: id,
});
