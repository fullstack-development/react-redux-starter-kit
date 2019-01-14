import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';

import { BaseStyles, Theme } from 'shared/styles';
import { IAppReduxState } from 'shared/types/app';

import { UITheme } from '../../../namespace';
import { selectors } from '../../../redux';
import { getTheme } from '../../../themeFactory';

interface IOwnProps {
  disableStylesGeneration?: boolean;
}

interface IStateProps {
  uiTheme: UITheme;
}

interface IState {
  themes: Record<UITheme, Theme>;
}

type Props = IStateProps & IOwnProps;

class ThemeProvider extends React.Component<Props & RouteComponentProps, IState> {
  public state: IState = {
    themes: {
      blue: getTheme('blue'),
      darkBlue: getTheme('darkBlue'),
    },
  };

  public render() {
    const { children, uiTheme, disableStylesGeneration } = this.props;
    const { themes } = this.state;

    return (
      <MuiThemeProvider theme={themes[uiTheme]} disableStylesGeneration={disableStylesGeneration}>
        <CssBaseline />
        <BaseStyles />
        {children}
      </MuiThemeProvider>
    );
  }
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    uiTheme: selectors.selectUITheme(state),
  };
}

export default withRouter(connect(mapState)(ThemeProvider));
