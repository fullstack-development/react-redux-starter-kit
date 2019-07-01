import { IAppReduxState } from 'shared/types/app';

export function selectState(state: IAppReduxState) {
  return state.featureExample;
}

export function selectCount(state: IAppReduxState) {
  return selectState(state).data.count;
}
