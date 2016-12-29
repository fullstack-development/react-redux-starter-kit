import HttpActions from './HttpActions';
import { Namespace as LocationsNamespace } from 'features/locationSelect';
import { IOrderFormResponse, IOrderFormRequest } from '../../modules/OrderForm/namespace';
import * as mocks from './mocks';

interface ICategoriesResponse {
  categories: Array<{ name: string, id: number }>;
}

interface IFieldsResponse {
  fields: Object;
}

class Api {
  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    this.actions = new HttpActions(`${baseUrl}/${version}`);
  }

  public async loadCategories(): Promise<ICategoriesResponse> {
    // const response: Axios.AxiosXHR<CategoriesResponse> = await this.actions.get<CategoriesResponse>('/categories/');
    return mocks.categories;
  }

  public async loadFields(uid: number): Promise<IFieldsResponse> {
    // const response: Axios.AxiosXHR<FieldsResponse> = await this.actions.get<FieldsResponse>(`/categories/${uid}/`);
    return mocks.schemas[uid];
  }

  public async loadCities(): Promise<LocationsNamespace.CityResponse[]> {
    // const response: Axios.AxiosXHR<Array<LocationsNamespace.CityResponse>> =
    // await this.actions.get<Array<LocationsNamespace.CityResponse>>('/cities/');
    return mocks.cities;
  }

  public async saveFields(data: IOrderFormRequest): Promise<IOrderFormResponse> {
    const response: Axios.AxiosXHR<IOrderFormResponse> =
      await this.actions.post<IOrderFormResponse>('/travels/create/', data);
    return response.data;
  }
}

export default Api;
