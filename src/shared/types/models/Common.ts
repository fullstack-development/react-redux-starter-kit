import { IPoint, ILocation } from './Location';
import { IFlatFormProperties, ILocationProperties } from './DynamicFields';

export interface IOrder {
  dynamicValues: IFlatFormProperties;
  fromLocation: IPoint;
  location: ILocation;
  locationValues: ILocationProperties;
  selectedCategoryUid: number;
}
