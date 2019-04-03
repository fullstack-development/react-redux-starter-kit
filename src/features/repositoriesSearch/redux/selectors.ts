import { IAppReduxState } from 'shared/types/app';
import { IRepository } from 'shared/types/models';
import { IPaginationState } from 'shared/types/common';
import { ICommunication } from 'shared/types/redux';
import * as NS from '../namespace';

function selectFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.repositoriesSearch;
}

export function selectFoundRepositories(state: IAppReduxState): IRepository[] {
  return selectFeatureState(state).data.foundRepositories;
}

export function selectCommunication(
  state: IAppReduxState, name: keyof NS.IReduxState['communication'],
): ICommunication {
  return selectFeatureState(state).communication[name];
}

export function selectRepositoriesSearchPaginationState(state: IAppReduxState): IPaginationState {
  return selectFeatureState(state).ui.repositoriesSearchPaginationState;
}

export function selectTotalResults(state: IAppReduxState): number {
  return selectFeatureState(state).data.totalResults;
}
