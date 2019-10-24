import { createMuiTheme } from '@material-ui/core/styles';

import { themeFactory, Theme } from 'shared/styles/theme';

import { UITheme } from '../namespace';

export const getTheme = (themeName: UITheme): Theme => {
  const extraTheme = themeFactory(themeName);

  return {
    ...(createMuiTheme({
      palette: {
        primary: {
          main: extraTheme.palette.primary.main,
          light: extraTheme.palette.primary.light,
          dark: extraTheme.palette.primary.dark,
          contrastText: extraTheme.palette.primary.contrastText,
        },
        error: {
          main: extraTheme.palette.error.main,
        },
      },
      typography: {
        fontFamily: extraTheme.typography.primaryFont,
      },
      shape: {
        borderRadius: extraTheme.sizes.control.borderRadius,
      },
      spacing: extraTheme.spacing,
    })),
    extra: extraTheme,
  };
};
