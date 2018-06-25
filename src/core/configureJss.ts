import { create } from 'jss';
import jssCompose from 'jss-compose';
import { blue } from '@material-ui/core/colors';
import { createGenerateClassName, jssPreset, createMuiTheme } from '@material-ui/core/styles';
import { IJssDependencies } from 'shared/types/app';

export function configureJss(virtual?: boolean): IJssDependencies {
  // Place to add jss-plugins [https://material-ui.com/customization/css-in-js/#plugins]
  const jss = create({ virtual, plugins: [...jssPreset().plugins, jssCompose()] });
  const generateClassName = createGenerateClassName();

  const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });

  return { jss, generateClassName, theme };
}
