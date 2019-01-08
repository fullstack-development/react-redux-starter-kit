import { Theme as MaterialTheme } from '@material-ui/core/styles';
import { hexToRGBA } from './helpers';

// Find color name http://chir.ag/projects/name-that-color
// https://github.com/insomnious0x01/ntc-js
const colors = {
  dodgerBlue: '#2376F5',
<<<<<<< HEAD
  governorBay: '##3631B6',
  anakiwa: '#7BDEFF',
  wildSand: '#f4f4f4',
  mercury: '#e2e2e2',
  silver: '#c9c9c9',
  dustyGray: '#979797',
  codGray: '#1e1e1e',
  monza: '#d0021b',
  saffron: '#F5BF23',
=======
  governorBay: '#3631B6',
  anakiwa: '#7BDEFF',
  redRibbon: '#E90C14',
  corn: '#F7BA08',
  gallery: '#ECEAEA',
  silver: '#c9c9c9',
  codGray: '#1e1e1e',
>>>>>>> mvp-base
  white: '#fff',
  black: '#000',
};

export const theme = {
  colors,
  palette: {
    text: {
      primary: colors.codGray,
      primaryInverted: colors.white,
      secondary: hexToRGBA(colors.codGray, 0.58),
<<<<<<< HEAD
      warning: colors.saffron,
      positive: colors.dodgerBlue,
      negative: colors.monza,
=======
      warning: colors.corn,
      positive: colors.dodgerBlue,
      negative: colors.redRibbon,
>>>>>>> mvp-base
      disabled: hexToRGBA(colors.codGray, 0.55),
    },
    control: {
      border: {
<<<<<<< HEAD
        normal: colors.mercury,
        hover: colors.governorBay,
        focus: colors.dodgerBlue,
        disabled: colors.mercury,
=======
        normal: colors.gallery,
        hover: colors.governorBay,
        focus: colors.dodgerBlue,
        disabled: colors.gallery,
>>>>>>> mvp-base
      },
      bg: {
        normal: colors.white,
        hover: colors.governorBay,
        focus: colors.dodgerBlue,
<<<<<<< HEAD
        disabled: colors.mercury,
=======
        disabled: colors.gallery,
>>>>>>> mvp-base
      },
    },
  },
  sizes: {
    control: {
      borderRadius: 4,
      minHeight: 40,
    },
  },
  spacing: {
    unit: 8,
  },
  typography: {
    primaryFont: ['OpenSans', 'Arial', 'sans-serif'].join(','),
  },
  zIndex: {
    newContext: 0,
    modal: 1400,
    tooltip: 1500,
    beforeContext: (zIndex: number) => --zIndex,
    afterContext: (zIndex: number) => ++zIndex,
  },
  defaultTransitionDuration: '0.4s',
};

export type Theme = MaterialTheme & { extra: typeof theme };
