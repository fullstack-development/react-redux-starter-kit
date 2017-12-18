import initial from '../data/initial';
import { IReduxState } from '../../namespace';

export default function reducer(state: IReduxState = initial, action: { type: string }) {
  return state;
}
