import { create } from 'jss';
import jssCompose from 'jss-compose';
import { createGenerateClassName, jssPreset, createMuiTheme } from '@material-ui/core/styles';
import { IJssDependencies } from 'shared/types/app';
import { theme as extraTheme, Theme } from 'shared/styles/theme';

export function configureJss(virtual?: boolean): IJssDependencies {
  // Place to add jss-plugins [https://material-ui.com/customization/css-in-js/#plugins]
  const jss = create({ virtual, plugins: [...jssPreset().plugins, jssCompose()] });
  const generateClassName = createGenerateClassName();

  const theme: Theme = {
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

  return { jss, generateClassName, theme };
}
