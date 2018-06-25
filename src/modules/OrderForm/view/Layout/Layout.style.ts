import injectSheet, { Theme, WithStyles } from 'react-jss';
import { rule } from 'shared/helpers/style';
import { green } from '@material-ui/core/colors';

const styles = (theme: Theme) => ({
  card_root: rule({
    overflow: 'unset',
  }),
  actions: rule({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  result: rule({
    color: green['500'],
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
