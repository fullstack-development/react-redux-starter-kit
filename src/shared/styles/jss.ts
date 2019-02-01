// tslint:disable-next-line:import-blacklist
import injectSheet, { Theme, WithStyles, SheetsRegistry, JSS, CSSProperties, JssProvider } from 'react-jss';
import withStyleSheet from '@material-ui/core/styles/withStyles';

const withStyles = withStyleSheet as typeof injectSheet;

export { withStyles, Theme, WithStyles, SheetsRegistry, JSS, CSSProperties, JssProvider };
