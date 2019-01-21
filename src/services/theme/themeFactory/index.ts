import { themeFactory, Theme } from 'shared/styles/theme';
import { createMuiTheme } from '@material-ui/core/styles';
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
        useNextVariants: true, // https://material-ui.com/style/typography/#migration-to-typography-v2
        fontFamily: extraTheme.typography.primaryFont,
      },
      shape: {
        borderRadius: extraTheme.sizes.control.borderRadius,
      },
      spacing: {
        unit: extraTheme.spacing.unit,
      },
    })),
    extra: extraTheme,
  };
};
