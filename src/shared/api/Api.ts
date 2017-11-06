import { bind } from 'decko';
import HttpActions from './HttpActions';

import { сonvertCityResponse, convertCategoriesResponse } from './converters';
import { ICityResponse, ICategoriesResponse } from './types/responses';
import { INormalizedCities, ICategory } from 'shared/types/models';
import { IOrderFormResponse, IOrderFormRequest } from '../../modules/OrderForm/namespace';

interface IFieldsResponse {
  fields: object;
}

class Api {
  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    this.actions = new HttpActions(`${baseUrl}/${version}`);
  }

  @bind
  public async loadCategories(): Promise<ICategory[]> {
    const response = await this.actions.get<ICategoriesResponse>('/categories/');
    return convertCategoriesResponse(response.data);
  }

  @bind
  public async loadFields(uid: number): Promise<IFieldsResponse> {
    const response = await this.actions.get<IFieldsResponse>(`/categories/${uid}/`);
    return response.data;
  }

  @bind
  public async loadCities(): Promise<INormalizedCities> {
    const response = await this.actions.get<ICityResponse[]>('/cities/');
    return сonvertCityResponse(response.data);
  }

  @bind
  public async saveFields(data: IOrderFormRequest): Promise<IOrderFormResponse> {
    const response = await this.actions.post<IOrderFormResponse>('/travels/create/', data);
    return response.data;
  }
}

export { ICategoriesResponse, IFieldsResponse };
export default Api;
