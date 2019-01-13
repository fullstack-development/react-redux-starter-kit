import * as React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { IAppReduxState } from 'shared/types/app';

import { UITheme } from '../../namespace';
import { selectors } from '../../redux';

interface IProps {
  uiTheme: UITheme;
}

interface IState {
  dark: any;
  blue: any;
}

function mapState(state: IAppReduxState): IProps {
  return {
    uiTheme: selectors.selectUITheme(state),
  };
}

class ThemeProvider extends React.PureComponent<IProps, IState> {
  public render() {
    const { children, uiTheme } = this.props;
    const theme = this.state[uiTheme];

    return (
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    );
  }
}

export default connect(mapState)(ThemeProvider);
