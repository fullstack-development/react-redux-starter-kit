import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  link: rule({
    margin: theme.spacing.unit,
    '&:hover, &:active, &:visited': {
      color: 'inherit',
    },
  }),
  content: rule({
    margin: theme.spacing.unit,
    marginLeft: 'auto',
    paddingLeft: theme.spacing.unit,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
