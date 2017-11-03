import { Action } from './namespace';

function insertStateByKeyPath(state: any, keyPath: string[], instanceKey: string, instanceState: any): any {
  const keyPathToState = [ ...keyPath ];
  const key: string | undefined = keyPathToState.shift();
  if (!(state instanceof Object)) {
    return state;
  }
  if (key === undefined) {
    return { ...state, [instanceKey]: instanceState };
  }
  return {
    ...state,
    [key]: insertStateByKeyPath(state[key], keyPathToState, instanceKey, instanceState),
  };
}

export function reducer(state: any, action: Action): any {
  switch (action.type) {
  case '@@MULTI_CONNECT:ADD_INSTANCE': {
    const { initialState, instanceKey, keyPathToState } = action.payload;
    if (keyPathToState.reduce((prev, cur) => prev[cur], state)[instanceKey]) {
      return state;
    }
    return insertStateByKeyPath(state, keyPathToState, instanceKey, initialState);
  }
  case '@@MULTI_CONNECT:REMOVE_INSTANCE': {
    const { instanceKey, keyPathToState } = action.payload;
    return insertStateByKeyPath(state, keyPathToState, instanceKey, undefined);
  }
  default: return state;
  }
}
