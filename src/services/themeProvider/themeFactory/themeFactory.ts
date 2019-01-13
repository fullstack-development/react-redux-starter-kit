import { theme as extraTheme, Theme } from 'shared/styles/theme';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme: Theme = {
  ...(createMuiTheme({
    palette: {
      primary: {
        main: extraTheme.primary.main,
        light: extraTheme.primary.light,
        dark: extraTheme.primary.dark,
        contrastText: extraTheme.primary.contrastText,
      },
      error: {
        main: extraTheme.colors.redRibbon,
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
