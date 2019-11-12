import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { Theme } from 'shared/styles';
import { IAppReduxState } from 'shared/types/app';

import { UITheme } from '../../../namespace';
import { selectors } from '../../../redux';
import { getTheme } from '../../../themeFactory';

interface IStateProps {
  uiTheme: UITheme;
}

interface IState {
  theme: Theme;
}

type Props = IStateProps & RouteComponentProps;

class ThemeProviderComponent extends React.Component<Props, IState> {
  public state: IState = {
    theme: getTheme(this.props.uiTheme),
  };

  static getDerivedStateFromProps(props: Props) {
    const { uiTheme } = props;
    return { theme: getTheme(uiTheme) };
  }

  public render() {
    const { children } = this.props;
    const { theme } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
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

export const ThemeProvider = withRouter(connect(mapState)(ThemeProviderComponent));
