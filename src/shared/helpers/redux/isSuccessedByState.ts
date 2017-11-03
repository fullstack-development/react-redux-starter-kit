import { ICommunicationState } from './namespace';

export default function isSuccessedByState<T>(prev: ICommunicationState<T>, next: ICommunicationState<T>): boolean {
  return prev.isRequesting && !next.isRequesting && !next.error;
}
