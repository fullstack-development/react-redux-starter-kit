import injectSheet, { WithStyles, Theme } from 'react-jss';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  rightIcon: rule({
    marginLeft: theme.spacing.unit * 1.5,
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
