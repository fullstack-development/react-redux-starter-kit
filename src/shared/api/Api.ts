import { bind } from 'decko';
import HttpActions from './HttpActions';

import { сonvertCityResponse } from './converters';
import { ICityResponse } from './types/responses';
import { INormalizedCities } from 'shared/types/models';
import { IOrderFormResponse, IOrderFormRequest } from '../../modules/OrderForm/namespace';

interface ICategoriesResponse {
  categories: Array<{ name: string, id: number }>;
}

interface IFieldsResponse {
  fields: object;
}

class Api {
  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    this.actions = new HttpActions(`${baseUrl}/${version}`);
  }

  @bind
  public async loadCategories(): Promise<ICategoriesResponse> {
    const response: Axios.AxiosXHR<ICategoriesResponse> = await this.actions.get<ICategoriesResponse>('/categories/');
    return response.data;
  }

  @bind
  public async loadFields(uid: number): Promise<IFieldsResponse> {
    const response: Axios.AxiosXHR<IFieldsResponse> = await this.actions.get<IFieldsResponse>(`/categories/${uid}/`);
    return response.data;
  }

  @bind
  public async loadCities(): Promise<INormalizedCities> {
    const response: Axios.AxiosXHR<ICityResponse[]> = await this.actions.get<ICityResponse[]>('/cities/');
    return сonvertCityResponse(response.data);
  }

  @bind
  public async saveFields(data: IOrderFormRequest): Promise<IOrderFormResponse> {
    const response: Axios.AxiosXHR<IOrderFormResponse> =
      await this.actions.post<IOrderFormResponse>('/travels/create/', data);
    return response.data;
  }
}

export { ICategoriesResponse, IFieldsResponse };
export default Api;
