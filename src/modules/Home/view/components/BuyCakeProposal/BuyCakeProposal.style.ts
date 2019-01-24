import { withStyles, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = {
  root: rule({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  content: rule({}),
};

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
