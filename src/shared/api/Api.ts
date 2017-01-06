import HttpActions from './HttpActions';
import { Namespace as LocationsNamespace } from 'features/locationSelect';
import { IOrderFormResponse, IOrderFormRequest } from '../../modules/OrderForm/namespace';

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
    const response: Axios.AxiosXHR<ICategoriesResponse> = await this.actions.get<ICategoriesResponse>('/categories/');
    return response.data;
  }

  public async loadFields(uid: number): Promise<IFieldsResponse> {
    const response: Axios.AxiosXHR<IFieldsResponse> = await this.actions.get<IFieldsResponse>(`/categories/${uid}/`);
    return response.data;
  }

  public async loadCities(): Promise<LocationsNamespace.CityResponse[]> {
    const response: Axios.AxiosXHR<LocationsNamespace.CityResponse[]> =
      await this.actions.get<LocationsNamespace.CityResponse[]>('/cities/');
    return response.data;
  }

  public async saveFields(data: IOrderFormRequest): Promise<IOrderFormResponse> {
    const response: Axios.AxiosXHR<IOrderFormResponse> =
      await this.actions.post<IOrderFormResponse>('/travels/create/', data);
    return response.data;
  }
}

export { ICategoriesResponse, IFieldsResponse };
export default Api;
