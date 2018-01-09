import { bind } from 'decko';
// import HttpActions from './HttpActions';

import { convertCityResponse, convertTravelToRequest } from './converters';
import { INormalizedCities, ICategory, IFields, ITravelOrder } from 'shared/types/models';
import { mockCities, mockSchemas, mockCategories } from 'shared/helpers/mocks';
import { delay } from 'redux-saga';

class Api {
  // private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    // this.actions = new HttpActions(`${baseUrl}/${version}`);
  }

  @bind
  public async loadCategories(): Promise<ICategory[]> {
    await delay(500);
    return mockCategories;
  }

  @bind
  public async loadFields(uid: number): Promise<IFields> {
    await delay(500);
    return mockSchemas[uid];
  }

  @bind
  public async loadCities(): Promise<INormalizedCities> {
    await delay(500);
    return convertCityResponse(mockCities);
  }

  @bind
  public async createTravelOrder(travelOrder: ITravelOrder): Promise<string> {
    convertTravelToRequest(travelOrder);
    return 'Successfully created';
  }
}

export default Api;
