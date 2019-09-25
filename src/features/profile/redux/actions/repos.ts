import { IRepository } from 'shared/types/models';

export const saveRepo = (repo: IRepository) => ({
  type: 'PROFILE:SAVE_REPO',
  payload: repo,
});

export const removeRepo = (id: number) => ({
  type: 'PROFILE:REMOVE_REPO',
  payload: id,
});
