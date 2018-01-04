import { IReduxField } from 'shared/types/redux';

export type FieldsState<F extends string> = {
  [P in F]: IReduxField<any>;
};

export type Validator<S> = (nextState: S, prevState: S) => string;
