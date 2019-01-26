import { IAppReduxState } from 'shared/types/app';
import { ICakePreview } from 'shared/types/models';
import * as NS from '../namespace';

function selectFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.buyCakes;
}

export function selectCakesPreview(state: IAppReduxState): ICakePreview[] {
  return selectFeatureState(state).data.cakesPreview;
}
