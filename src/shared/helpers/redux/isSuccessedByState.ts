import { ICommunication } from 'shared/types/redux';

function isSuccessedByState<T>(prev: ICommunication<T>, next: ICommunication<T>): boolean {
  return prev.isRequesting && !next.isRequesting && !next.error;
}

export { isSuccessedByState };
