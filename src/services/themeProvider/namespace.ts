import { IAction } from 'shared/types/redux';

export type UITheme = 'blue' | 'darkBlue';

export interface IReduxState {
  data: {
    theme: UITheme;
  };
}

export type ISetTheme = IAction<'THEME:SET_THEME', UITheme>;
export type Action = ISetTheme;
