import injectSheet, { WithStyles, Theme } from 'react-jss';
import { rule } from 'shared/helpers/style';
import { IProps } from './Errors';

const styles = (theme: Theme) => ({
  root: rule({
    display: ({ hidden }: IProps) => hidden ? 'block' : 'none',
  }),
  error: rule({
    display: 'block',
    color: theme.palette.error.main,
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
