import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  content: rule({
    padding: theme.spacing.unit * 3,

    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.md,
      margin: '0 auto',
    },
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
