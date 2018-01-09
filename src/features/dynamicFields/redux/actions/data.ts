import { FieldValue } from 'shared/view/components/GenericInput/GenericInput';
import * as NS from '../../namespace';

export function changeFieldValue(name: string, value: FieldValue): NS.IChangeFieldValueAction {
  return { type: 'DYNAMIC_FIELDS:CHANGE_FIELD_VALUE', payload: { name, value } };
}
