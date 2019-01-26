import { delay } from 'redux-saga';

import { ICakePreview } from 'shared/types/models';

// import HttpActions from './HttpActions';
import { cakesPreview } from './mocks';

class Api {
  // private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    // this.actions = new HttpActions(`${baseUrl}/${version}`);
  }

  public async loadCakesPreview(): Promise<ICakePreview[]> {
    await delay(500);
    return cakesPreview;
  }
}

export default Api;
