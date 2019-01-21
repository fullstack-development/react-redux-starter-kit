import { IReduxEntry } from 'shared/types/app';
import { reducer, actions, selectors } from './redux';
import ThemeProvider from './view/containers/ThemeProvider/ThemeProvider';
import ThemeSelector from './view/containers/ThemeSelector/ThemeSelector';

export { ThemeProvider, ThemeSelector, actions, selectors };
export const reduxEntry: IReduxEntry = {
  reducers: { theme: reducer },
};
