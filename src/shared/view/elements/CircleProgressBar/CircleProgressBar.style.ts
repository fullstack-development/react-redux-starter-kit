import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  piechart: rule({
    position: 'relative',
  }),
  overlay: rule({
    color: theme.extra.colors.silver,
  }),
  progress: rule({
    color: theme.palette.primary.main,
    position: 'absolute',
    left: 0,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
