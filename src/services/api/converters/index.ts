import { Schema, arrayOf, normalize } from 'normalizr';
import normalizeKey from 'shared/helpers/normalizeKey';
import { ICityResponse } from '../types/responses';
import { IOrderFormRequest } from '../types/requests';
import { INormalizedCities, IOrder } from 'shared/types/models';

/* Define schema for normalizing */
const city = new Schema('cities');
const area = new Schema('areas');
city.define({ areas: arrayOf(area) });

export function сonvertCityResponse(response: ICityResponse[]): INormalizedCities {
  return normalize(
    response,
    arrayOf(city),
    {
      assignEntity(output: any, key: string, value: any) {
        output[key] = value;
        normalizeKey(output, key);
        if (key === 'point') {
          const point = output[key].split(',').map((val: string) => parseFloat(val.trim()));
          output[key] = { lat: point[0], lng: point[1] };
        }
      },
    },
  );
}

export function convertTravelToRequest(data: IOrder): IOrderFormRequest {
  return {
    attributes: data.attributes,
    category: data.selectedCategoryUid,
    location: data.location.area,
    // TODO: fill other properties below
    coord_from_lng: data.fromLocation.lng,
    coord_from_lat: data.fromLocation.lat,
    coord_to_lng: data.locationValues.to.lng,
    coord_to_lat: data.locationValues.to.lat,

    description: '',
    notify: false,
  };
}
