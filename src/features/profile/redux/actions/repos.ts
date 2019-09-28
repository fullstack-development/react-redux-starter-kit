import { ISavedRepository } from 'shared/types/models';

export const saveRepo = (repo: ISavedRepository) => ({
  type: 'PROFILE:SAVE_REPO',
  payload: repo,
});

export const removeRepo = (id: number) => ({
  type: 'PROFILE:REMOVE_REPO',
  payload: id,
});
