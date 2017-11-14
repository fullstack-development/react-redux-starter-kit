import { IOrderFormRequest } from '../../namespace';

const selectedLocation = {
  city: 1,
  area: 2,
  point: {
    lat: 55,
    lng: 37,
  },
};

const state = {
  locationSelect: {
    data: { selectedLocation: null },
  },
  dynamicFields: {
    data: {
      values: {
        from: {
          label: 'Astana',
          location: { lat: 7, lng: 80 },
        },
        to: {
          label: 'Moscow',
          location: { lat: 51, lng: 55 },
        },
        },
      fields: {
        schema: {
        properties: {
          testField: {
            type: 'integer',
            component: 'text',
            order: 1,
            label: 'label',
            pattern: 'pattern',
            placeholder: '',
            display: 1,
            enum: ['1', '2'],
            minimum: 1,
            maximum: 3,
            minLength: 1,
            maxLength: 3,
          },
        },
        required: ['1', '2'],
        type: 'string',
        title: 'title',
      },
        id: 1,
        uid: 2,
        alert: true,
        name: 23,
      },
    },
  },
  categorySelect: {
    data: {
      selected: 1,
    },
  },
};

const data: IOrderFormRequest = {
  attributes: {from: 'Astana', to: 'Moscow'},
  category: 1,
  location: 2,
  coord_from_lng: 80,
  coord_from_lat: 7,
  coord_to_lng: 55,
  coord_to_lat: 51,
  description: '',
  notify: false,
};

export { data, state, selectedLocation };
