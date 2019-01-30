import { withStyleSheet, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = (_theme: Theme) => ({
  root: rule({
    padding: 5,
  }),
});

export const provideStyles = withStyleSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
