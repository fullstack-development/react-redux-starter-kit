import { FieldValue } from 'shared/view/components/GenericInput/GenericInput';
import { IAction } from 'shared/types/app';

function changeFieldValue(name: string, value: FieldValue): IAction {
  return { type: 'DYNAMIC_FIELDS:CHANGE_FIELD_VALUE', payload: { name, value } };
}

export { changeFieldValue };
