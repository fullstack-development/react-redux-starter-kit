import { create } from 'jss';
import jssCompose from 'jss-compose';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { IJssDependencies } from 'shared/types/app';

export function configureJss(virtual?: boolean): IJssDependencies {
  // Place to add jss-plugins [https://material-ui.com/customization/css-in-js/#plugins]
  const jss = create({ virtual, plugins: [...jssPreset().plugins, jssCompose()] });
  jss.setup({ insertionPoint: 'jss-insertion-point' });
  const generateClassName = createGenerateClassName();

  return { jss, generateClassName };
}
