import { IReduxField, ICommunicationState } from './namespace';

export function initField<T>(value: T, error: string = ''): IReduxField<T> {
  return { value, error };
}

export const initCommunicationField: ICommunicationState = { isRequesting: false, error: '' };

export function initCommunicationFields<S>(
  fieldNames: Array<keyof S>,
): { [P in keyof S]: ICommunicationState } {
  return fieldNames.reduce((res, fieldName) => ({
    ...res,
    [fieldName]: { isRequesting: false, error: '' },
  }), {} as any);
}
