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
          main: extraTheme.colors.royalBlue,
          light: extraTheme.colors.anakiwa,
          dark: extraTheme.colors.governorBay,
          contrastText: extraTheme.colors.white,
        },
        error: {
          main: extraTheme.colors.monza,
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
      overrides: {
        MuiButton: {
          root: {
            textTransform: 'initial',
            minHeight: extraTheme.sizes.control.minHeight,
          },
        },
        MuiSvgIcon: {
          root: {
            fontSize: 22,
          },
        },
      },
    })),
    extra: extraTheme,
  };

  return { jss, generateClassName, theme };
}
