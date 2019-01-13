import { IReduxEntry } from 'shared/types/app';
import { reducer, actions, selectors } from './redux';

export { actions, selectors };
export const reduxEntry: IReduxEntry = {
  reducers: { theme: reducer },
};
