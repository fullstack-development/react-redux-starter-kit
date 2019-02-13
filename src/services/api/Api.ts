import { bind } from 'decko';

import { IUsersSearchOptions } from 'shared/types/github';
import { IUsersSearchResults, IRepositoriesSearchResult } from 'shared/types/models';

import { SearchUserResponse, IDetailedServerUser, SearchRepositoriesResponse } from './types';
import { constructUsersSearchQuery, getTotalPagesFromLinkHeader } from './helpers';
import { convertUser, convertUserDetails, convertRepository } from './converters';
import HttpActions from './HttpActions';

class Api {
  private actions: HttpActions;

  constructor() {
    this.actions = new HttpActions('https://api.github.com/');
  }

  // TODO: accept header with api version?
  // TODO: user => users
  @bind
  public async searchUsers(
    searchString: string, options: IUsersSearchOptions, page: number,
  ): Promise<IUsersSearchResults> {
    const URL = `/search/users?q=${constructUsersSearchQuery(searchString, options, page)}`;
    const response = await this.actions.get<SearchUserResponse>(URL);
    const users = response.data.items;
    const totalPages = getTotalPagesFromLinkHeader(response.headers.link);
    return { totalPages, users: users.map(convertUser) };
  }

  @bind
  public async loadUserDetails(username: string) {
    const URL = `/users/${username}`;
    const response = await this.actions.get<IDetailedServerUser>(URL);
    return convertUserDetails(response.data);
  }

  @bind
  public async searchRepositories(searchString: string, page: number): Promise<IRepositoriesSearchResult> {
    const URL = `/search/repositories?q=${searchString}&page=${page}`;
    const response = await this.actions.get<SearchRepositoriesResponse>(URL);
    const repositories = response.data.items;
    const totalPages = getTotalPagesFromLinkHeader(response.headers.link);
    return { totalPages, repositories: repositories.map(convertRepository) };
  }
}

export default Api;
