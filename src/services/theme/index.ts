import { IReduxEntry } from 'shared/types/app';
import { reducer, actionCreators, selectors } from './redux';
import ThemeProvider from './view/containers/ThemeProvider/ThemeProvider';
import ThemeSelector from './view/containers/ThemeSelector/ThemeSelector';

export { ThemeProvider, ThemeSelector, actionCreators, selectors };
export const reduxEntry: IReduxEntry = {
  reducers: { theme: reducer },
};
