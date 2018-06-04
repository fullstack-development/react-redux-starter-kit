import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { GetClassKey } from 'shared/types/app';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  content: rule({
    padding: theme.spacing.unit * 3,

    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.md,
      margin: '0 auto',
    },
  }),
  description: rule({
    marginBottom: theme.spacing.unit * 4,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<GetClassKey<typeof styles>>;
