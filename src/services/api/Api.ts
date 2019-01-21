// import { bind } from 'decko';
// import HttpActions from './HttpActions';

class Api {
  // private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    // this.actions = new HttpActions(`${baseUrl}/${version}`);
  }
}

export default Api;
