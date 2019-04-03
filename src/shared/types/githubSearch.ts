import { IGithubUser, IRepository } from './models';

export interface IUsersSearchFilters {
  searchBy: 'login' | 'fullname' | 'email' | 'username-email';
  searchFor: 'user' | 'org' | 'both';
  perPage: 30 | 50 | 100;
  reposLanguage?: string;
  minRepos?: number;
  maxRepos?: number;
}

export interface IRepositoriesSearchFilters {
  starsNumber?: string;
  forksNumber?: string;
  language?: string;
  owner?: string;
}

export interface IPaginatedResponse<T> {
  totalPages: number;
  totalResults: number;
  data: T[];
}

export interface IPaginatedSearchRequest<T> {
  page: number;
  searchOptions: T;
}

export type IRepositoriesSearchResults = IPaginatedResponse<IRepository>;
export type IUsersSearchResults = IPaginatedResponse<IGithubUser>;
