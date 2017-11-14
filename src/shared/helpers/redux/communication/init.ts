import { ICommunicationState } from '../namespace';

export const initialCommunicationField: ICommunicationState = { isRequesting: false, error: '' };

export function initCommunicationFields<S>(
  fieldNames: Array<keyof S>,
): { [P in keyof S]: ICommunicationState } {
  return fieldNames.reduce((communicationFields, fieldName) => ({
    ...communicationFields,
    [fieldName]: initialCommunicationField,
  }), {} as any);
}
