import injectSheet, { WithStyles } from 'react-jss';
import { rule } from 'shared/helpers/style';

const styles = {
  root: rule({
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  }),
  label: rule({
    width: '10rem',
    fontWeight: 700,
  }),
  input: rule({
    width: 0,
    flexGrow: 1,
  }),
};

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
