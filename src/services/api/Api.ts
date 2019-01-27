import { bind } from 'decko';

import { IUser, ISearchUserResponse } from 'shared/types/models';

import { convertUser } from './converters';
import HttpActions from './HttpActions';

class Api {
  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    // this.actions = new HttpActions(`${baseUrl}/${version}`);
    this.actions = new HttpActions('');
  }

  @bind
  public async searchUser(userName: string): Promise<IUser[]> {
    const response = await this.actions.get<ISearchUserResponse>(`https://api.github.com/search/users?q=${userName}`);
    const users = response.data.items;
    return users.map(x => convertUser(x));
  }
}

export default Api;
