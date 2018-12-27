import injectSheet, { WithStyles, Theme } from 'react-jss';
import { rule } from 'shared/helpers/style';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = (theme: Theme) => ({
  root: rule({
    boxSizing: 'border-box',
    padding: '8px 16px',
    minHeight: 40,
    color: theme.palette.primary.main,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.extra.colors.silver,
    zIndex: theme.extra.zIndex.newContext,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      borderColor: theme.palette.primary.main,
      zIndex: theme.extra.zIndex.afterContext(theme.extra.zIndex.newContext),
      // Reset on touch devices, it doesn't add specificity
      ['@media (hover: none)']: {
        backgroundColor: 'transparent',
      },
      '&$selected': {
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
      },
    },
    '&$disabled': {
      borderColor: theme.palette.action.disabled,
    },
    '&$selected': {
      color: theme.extra.colors.white,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    '&:not(:first-child)': {
      marginLeft: -1,
    },
  }),
  selected: rule({
    zIndex: theme.extra.zIndex.afterContext(theme.extra.zIndex.newContext),
    '&:after': {
      opacity: 0,
    },
  }),
  disabled: rule({

  }),
  label: rule({
    textTransform: 'initial',
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
