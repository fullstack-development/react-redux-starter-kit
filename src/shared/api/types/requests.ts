import { IAttributes } from 'shared/types/models';

export interface IOrderFormRequest {
  attributes: IAttributes;
  notify: boolean;
  description: string;
  location: number;  // area id only - don't need a city id
  category: number;
  coord_from_lng: number;
  coord_from_lat: number;
  coord_to_lng: number;
  coord_to_lat: number;
}
