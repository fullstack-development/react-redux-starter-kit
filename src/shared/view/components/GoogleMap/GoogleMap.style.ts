import injectSheet, { WithStyles, Theme } from 'react-jss';
import { rule } from 'shared/helpers/style';
import targetSvg from './img/target.svg';

const styles = (theme: Theme) => ({
  root: rule({
    position: 'relative',
    width: '100%',
    height: 300,

    '&::after': {
      display: 'block',
      width: theme.spacing.unit * 2,
      height: theme.spacing.unit * 2,
      margin: 'auto',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: `url(${targetSvg}) center center no-repeat`,
      backgroundSize: 'contain',
      content: '""',
    },
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
