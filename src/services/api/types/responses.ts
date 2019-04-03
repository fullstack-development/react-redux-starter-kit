export interface IGithubAPIResponse<T> {
  total_count: number;
  items: T[];
}

export type SearchUserResponse = IGithubAPIResponse<IServerUser>;

export type SearchRepositoriesResponse = IGithubAPIResponse<IServerRepository>;

export interface IServerUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface IDetailedServerUser extends IServerUser {
  followers: number;
  following: number;
  public_repos: number;
  name: string;
  location: null | string;
}

export interface IServerRepository {
  id: number;
  open_issues: number;
  forks: number;
  stargazers_count: number;
  description: string;
  updated_at: string;
  name: string;
  html_url: string;
  language: string;
  owner: IServerUser;
}
