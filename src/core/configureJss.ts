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
<<<<<<< HEAD
          main: extraTheme.colors.dodgerBlue,
          light: extraTheme.colors.anakiwa,
          dark: extraTheme.colors.governorBay,
          contrastText: extraTheme.colors.white,
        },
        error: {
          main: extraTheme.colors.redRibbon,
=======
          main: extraTheme.colors.mediumPurple,
          light: extraTheme.colors.heliotrope,
          dark: extraTheme.colors.purpleHeart,
          contrastText: extraTheme.colors.white,
        },
        error: {
          main: extraTheme.colors.monza,
>>>>>>> 87c1e1fe9e03f331738a95ffd05234e217a29d08
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
