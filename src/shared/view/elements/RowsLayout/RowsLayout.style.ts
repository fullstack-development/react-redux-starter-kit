import { withStyles, WithStyles, Theme } from 'shared/styles';
import { rule, styledBy } from 'shared/helpers/style';

import { IProps } from './RowsLayout';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    flexGrow: 1,
    minHeight: '100%',
    backgroundColor: styledBy<IProps, 'background', string>('background', {
      primary: theme.colors.white,
      unset: 'unset',
    }, 'unset'),
  }),
  content: rule({
    flexGrow: 1,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
