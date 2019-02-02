import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (_theme: Theme) => ({
  gridItem: rule({
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 20,
  }),
});

export const provideStyles = withStyles(styles);
export type StylesProps = WithStyles<typeof styles>;
