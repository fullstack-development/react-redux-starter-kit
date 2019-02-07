import { IRepository } from 'shared/types/models';
import { convertUser } from './userSearch';
import { IServerRepository } from '../types';

export function convertRepository(repo: IServerRepository): IRepository {
  return {
    openIssuesNumber: repo.open_issues,
    starsNumber: repo.stargazers_count,
    forksNumber: repo.forks,
    description: repo.description,
    name: repo.full_name,
    htmlURL: repo.html_url,
    language: repo.language,
    updatedAt: repo.updated_at,
    owner: convertUser(repo.owner),
  };
}
