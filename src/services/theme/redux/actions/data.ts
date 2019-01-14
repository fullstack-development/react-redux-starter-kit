import * as NS from '../../namespace';

export function setTheme(theme: NS.UITheme): NS.ISetTheme {
  return { type: 'THEME:SET_THEME', payload: theme };
}
