import injectSheet, { WithStyles, Theme, CSSProperties } from 'react-jss';
import { rule } from 'shared/helpers/style';

function arrowGenerator(color: string): CSSProperties {
  return {
    '&[x-placement*="bottom"] $arrow': rule({
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    }),
    '&[x-placement*="top"] $arrow': rule({
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    }),
    '&[x-placement*="right"] $arrow': rule({
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    }),
    '&[x-placement*="left"] $arrow': rule({
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    }),
  };
}

const styles = (theme: Theme) => ({
  arrowPopper: arrowGenerator(theme.palette.grey[700]),
  arrow: rule({
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
