import { IReduxField } from './namespace';

export default function validateFields(...fields: Array<IReduxField<any, any>>): boolean {
  return fields.every(field => !field.error);
}
