import { Schema, arrayOf, normalize } from 'normalizr';
import normalizeKey from 'shared/helpers/normalizeKey';
import { ICityResponse, ICategoriesResponse } from 'shared/api/types/responses';
import { INormalizedCities, ICategory } from 'shared/types/models';

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

export function convertCategoriesResponse(categoriesResponse: ICategoriesResponse): ICategory[] {
  return categoriesResponse;
}
