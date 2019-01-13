import { IReduxEntry } from 'shared/types/app';
import { reducer, actions, selectors } from './redux';
import ThemeProvider from './view/containers/ThemeProvider';

export { ThemeProvider, actions, selectors };
export const reduxEntry: IReduxEntry = {
  reducers: { theme: reducer },
};
