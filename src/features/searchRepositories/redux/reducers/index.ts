import initial from '../data/initial';
import { IReduxState } from '../../namespace';
import { IAction } from 'shared/types/app';

export default function(state: IReduxState = initial, action: IAction) {
  return state;
}
