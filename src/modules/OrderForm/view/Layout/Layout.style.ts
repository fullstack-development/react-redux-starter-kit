import injectSheet, { Theme, WithStyles } from 'react-jss';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  card_root: rule({
    overflow: 'unset',
  }),
  actions: rule({
    display: 'flex',
    alignItems: 'center',
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;