import HttpActions from './HttpActions';
import { Namespace as LocationsNamespace } from 'features/locationSelect';
import HomeModuleNamespace from '../../modules/OrderForm/namespace';
import * as mocks from './mocks';

interface CategoriesResponse {
  categories: Array<{ name: string, id: number }>;
}
interface FieldsResponse {
  fields: Object;
}

class Api {
  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    this.actions = new HttpActions(`${baseUrl}/${version}`);
  }

  async loadCategories(): Promise<CategoriesResponse> {
    // const response: Axios.AxiosXHR<CategoriesResponse> = await this.actions.get<CategoriesResponse>('/categories/');
    return mocks.categories;
  }

  async loadFields(uid: number): Promise<FieldsResponse> {
    // const response: Axios.AxiosXHR<FieldsResponse> = await this.actions.get<FieldsResponse>(`/categories/${uid}/`);
    return mocks.schemas[uid];
  }

  async loadCities(): Promise<Array<LocationsNamespace.CityResponse>> {
    // const response: Axios.AxiosXHR<Array<LocationsNamespace.CityResponse>> = await this.actions.get<Array<LocationsNamespace.CityResponse>>('/cities/');
    return mocks.cities;
  }

  async saveFields(data: HomeModuleNamespace.OrderFormRequest): Promise<HomeModuleNamespace.OrderFormResponse> {
    const response: Axios.AxiosXHR<HomeModuleNamespace.OrderFormResponse> = await this.actions.post<HomeModuleNamespace.OrderFormResponse>('/travels/create/', data);
    return response.data;
  }
}

export default Api;
