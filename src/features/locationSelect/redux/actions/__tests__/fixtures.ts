import { INormalizedCitiesResponse, ICityResponse } from '../../../namespace';

const data: INormalizedCitiesResponse = {
  result: [1, 2],
  entities: {
    cities: {
      0: {
        displayName: 'name',
        name: 'test-name',
        city: 1,
        id: 1,
        point: {
          lat: 2.33,
          lng: 4.77,
        },
      },
    },
    areas: {
      0: {
        areas: [1, 2],
        id: 1,
        name: 'name',
      },
    },
  },
};

const citiesData: ICityResponse[] = [
  {
    name: 'test-name1',
    id: 1,
    areas: [{city: 0, display_name: 'display_name1', name: 'area-name1', point: 'point1'}],
  },
  {
    name: 'test-name2',
    id: 2,
    areas: [{city: 1, display_name: 'display_name2', name: 'area-name2', point: 'point2'}],
  },
];

export { data, citiesData };
