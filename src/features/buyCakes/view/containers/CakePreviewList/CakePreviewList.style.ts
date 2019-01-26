import { withStyles, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = {
  root: rule({
    listStyle: 'none',
    padding: 0,
  }),
  'cake-preview': rule({}),
};

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
