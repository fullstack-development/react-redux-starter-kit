import { IAddInstance, IRemoveInstance } from './namespace';

export function addInstance(instanceKey: string, initialState: any, keyPathToState: string[]): IAddInstance {
  return {
    type: '@@MULTI_CONNECT:ADD_INSTANCE',
    payload: { initialState, instanceKey, keyPathToState },
  };
}

export function removeInstance(instanceKey: string, keyPathToState: string[]): IRemoveInstance {
  return {
    type: '@@MULTI_CONNECT:REMOVE_INSTANCE',
    payload: { instanceKey, keyPathToState },
  };
}
