// tslint:disable-next-line:import-blacklist
import injectSheet, { Theme, WithStyles, SheetsRegistry, JSS, CSSProperties, JssProvider } from 'react-jss';
import withStyles from '@material-ui/core/styles/withStyles';

const withStyleSheet = withStyles as typeof injectSheet;

export { withStyleSheet, Theme, WithStyles, SheetsRegistry, JSS, CSSProperties, JssProvider };
