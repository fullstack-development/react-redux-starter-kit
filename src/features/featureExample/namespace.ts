export interface IReduxState {
  data: {
    count: number;
  };
}

export interface IIncrement {
  type: 'FEATURE_EXAMPLE:INCREMENT';
}

export type Action = IIncrement;
