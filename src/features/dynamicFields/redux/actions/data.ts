import GenericInputNamespace from './../../../../shared/view/components/GenericInput/GenericInput';
import AppRedux from '../../../../shared/types/app';

function changeFieldValue(name: string, value: GenericInputNamespace.FieldValue): AppRedux.Action {
  return { type: 'DYNAMIC_FIELDS:CHANGE_FIELD_VALUE', payload: { name, value } };
}

export { changeFieldValue };
