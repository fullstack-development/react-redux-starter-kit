import injectSheet, { WithStyles, Theme } from 'react-jss';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  root: rule({
    boxShadow: 'unset',
  }),
  selected: rule({

  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
