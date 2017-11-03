import { IReduxField } from '../namespace';

export default function initField<T>(value: T, error: string = ''): IReduxField<T> {
  return { value, error };
}
