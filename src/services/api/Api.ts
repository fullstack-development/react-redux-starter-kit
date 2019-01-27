import { bind } from 'decko';

import { IUser } from 'shared/types/models';

import HttpActions from './HttpActions';

class Api {
  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    // this.actions = new HttpActions(`${baseUrl}/${version}`);
    this.actions = new HttpActions('');
  }

  @bind
  public async searchUser(userName: string): Promise<IUser[]> {
    const response = await this.actions.get(`https://api.github.com/search/users?q=${userName}`);
    console.log(response);
    // const { responseURL } = response.request;
    // const imageID = responseURL.match(/\?image=(\d+)/)[1];
    return response.data as any;
  }
}

export default Api;
