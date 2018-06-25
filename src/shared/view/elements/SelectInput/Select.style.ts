import injectSheet, { Theme, WithStyles } from 'react-jss';
import { rule } from 'shared/helpers/style';

const ITEM_HEIGHT = 48;

const styles = (theme: Theme) => ({
  chip: rule({
    margin: theme.spacing.unit / 4,
  }),
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': rule({
    '.Select-control': rule({
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': rule({
        boxShadow: 'none',
      }),
    }),
    '.Select-multi-value-wrapper': rule({
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    }),
    '.Select--multi .Select-input': rule({
      margin: 0,
    }),
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': rule({
      padding: 0,
      color: theme.palette.getContrastText('#fff'),
    }),
    '.Select-noresults': rule({
      padding: theme.spacing.unit * 2,
    }),
    '.Select-input': rule({
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    }),
    '.Select-input input': rule({
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    }),
    '.Select-placeholder, .Select--single .Select-value': rule({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    }),
    '.Select-placeholder': rule({
      opacity: 0.42,
      color: theme.palette.common.black,
    }),
    '.Select-menu-outer': rule({
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    }),
    '.Select.is-focused:not(.is-open) > .Select-control': rule({
      boxShadow: 'none',
    }),
    '.Select-menu': rule({
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    }),
    '.Select-menu div': rule({
      boxSizing: 'content-box',
    }),
    '.Select-arrow-zone, .Select-clear-zone': rule({
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    }),
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': rule({
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    }),
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<typeof styles>;
