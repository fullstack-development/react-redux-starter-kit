import { spy } from 'sinon';
import { IFields } from '../../../namespace';

const fieldsMocks: IFields = {
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
};

const communicationsFixtures = {
  fetching: {
    isRequesting: false,
    error: '',
  },
};

const defaultProps = {
  category: undefined,
  fields: {},
  communications: communicationsFixtures,
};

const actionsProps = {
  loadFields: spy(),
  changeFieldValue: spy(),
};

export { defaultProps, actionsProps, fieldsMocks };
