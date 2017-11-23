import { IFlatFormProperties } from 'shared/types/models';

export interface ITravelOrderRequest {
  attributes: IFlatFormProperties;
  notify: boolean;
  description: string;
  location: number;  // area id only - don't need a city id
  category: number;
  coord_from_lng: number;
  coord_from_lat: number;
  coord_to_lng: number;
  coord_to_lat: number;
}
