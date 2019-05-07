import { IReduxEntry } from 'core/types';
import { reducer, actions, selectors } from './redux';
import * as namespace from './namespace';
import ThemeProvider from './view/containers/ThemeProvider/ThemeProvider';
import ThemeSelector from './view/containers/ThemeSelector/ThemeSelector';

export { ThemeProvider, ThemeSelector, actions, selectors, namespace };
export const reduxEntry: IReduxEntry = {
  reducers: { theme: reducer },
};
