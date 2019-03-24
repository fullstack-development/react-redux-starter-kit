import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { Theme } from 'shared/styles';
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
  theme: Theme;
}

type Props = IStateProps & IOwnProps;

class ThemeProvider extends React.Component<Props & RouteComponentProps, IState> {
  public state: IState = {
    theme: getTheme(this.props.uiTheme),
  };

  public componentDidUpdate(prevProps: Props) {
    if (this.props.uiTheme !== prevProps.uiTheme) {
      this.setState({ theme: getTheme(this.props.uiTheme) });
    }
  }

  public render() {
    const { children, disableStylesGeneration } = this.props;
    const { theme } = this.state;

    return (
      <MuiThemeProvider theme={theme} disableStylesGeneration={disableStylesGeneration}>
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
