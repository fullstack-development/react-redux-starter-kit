import { Theme as MaterialTheme } from '@material-ui/core/styles';

// Find color name http://chir.ag/projects/name-that-color
// https://github.com/insomnious0x01/ntc-js
const colors = {
  dodgerBlue: '#2376F5',
  governorBay: '#3631B6',
  anakiwa: '#7BDEFF',
  redRibbon: '#E90C14',
  corn: '#F7BA08',
  gallery: '#ECEAEA',
  silver: '#c9c9c9',
  codGray: '#1e1e1e',
  white: '#fff',
  black: '#000',
};

export const theme = {
  colors,
  primary: {
    main: colors.dodgerBlue,
    light: colors.anakiwa,
    dark: colors.governorBay,
    contrastText: colors.white,
  },
  sizes: {
    control: {
      borderRadius: 4,
    },
  },
  spacing: {
    unit: 8,
  },
  typography: {
    primaryFont: ['OpenSans', 'Arial', 'sans-serif'].join(','),
  },
  zIndex: {
    tooltip: 1500,
  },
  defaultTransitionDuration: '0.4s',
};

export type Theme = MaterialTheme & { extra: typeof theme };
