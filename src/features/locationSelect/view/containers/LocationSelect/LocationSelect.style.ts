import injectSheet, { WithStyles, Theme } from 'react-jss';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  form: rule({
    display: 'flex',
    alignItems: 'center',
  }),
  input: rule({
    width: 0,
    marginLeft: theme.spacing.unit * 2,
    flexGrow: 1,
  }),
  label: rule({
    margin: 0,
  }),
  map: rule({
    marginTop: theme.spacing.unit,
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
