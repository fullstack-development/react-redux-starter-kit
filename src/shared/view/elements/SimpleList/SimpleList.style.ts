import injectSheet, { Theme, WithStyles } from 'react-jss';
import { rule } from 'shared/helpers/style';
import { IProps } from './SimpleList';

const getMarginBottom = (theme: Theme) => (props: IProps) => theme.spacing.unit * (props.marginFactor || 1);

const styles = (theme: Theme) => ({
  root: rule({
    margin: 0,
    padding: 0,
  }),
  item: rule({
    listStyle: 'none',
    marginBottom: getMarginBottom(theme),

    '&:empty, &:last-child': {
      marginBottom: 0,
    },
  }),
  gutterBottom: rule({
    marginBottom: getMarginBottom(theme),
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
