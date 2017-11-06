export interface IAreaResponse {
  city: number;
  display_name: string;
  name: string;
  point: string;
}

export interface ICityResponse {
  areas: IAreaResponse[];
  name: string;
  id: number;
}

export type ITravelOrderResponse = string;

export type ICategoriesResponse = Array<{ id: number; uid: number; name: string }>;
