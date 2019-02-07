interface IGithubAPIResponse<T> {
  items: T[];
}

export type SearchUserResponse = IGithubAPIResponse<IServerUser>;

export type SearchRepositoryResponse = IGithubAPIResponse<IServerRepository>;

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
  open_issues: number;
  forks: number;
  stargazers_count: number;
  description: string;
  updated_at: string;
  full_name: string;
  html_url: string;
  language: string;
  owner: IServerUser;
}
