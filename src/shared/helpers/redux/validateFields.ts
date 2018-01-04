import { IReduxField } from 'shared/types/redux';

export default function validateFields(...fields: Array<IReduxField<any>>): boolean {
  return fields.every(field => !field.error);
}
