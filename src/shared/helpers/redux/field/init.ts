import { IReduxField } from 'shared/types/redux';

export default function initField<T>(value: T, error: string = ''): IReduxField<T> {
  return { value, error };
}
